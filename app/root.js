import React, { Component } from 'react'
import {Route,BrowserRouter as Router, Switch,Link} from 'react-router-dom';
import Header from './components/header'
import Player from './page/player'
import MusicList from './page/musiclist'
import { MUSIC_LIST } from './config/musiclist'
import Pubsub from 'pubsub-js'

class Root extends Component{
    constructor(props) {
        super(props)
        this.state={
            musicList: MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0] 
        }
    }

    playMusic(musicItem) {
        $('#player').jPlayer('setMedia', {
            mp3: musicItem.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem:musicItem
        })
    }

    findMusicIndex(musicItem) {
        return this.state.musicList.indexOf(musicItem);
    }

    playNext(type) {
        const { currentMusicItem,musicList } = this.state;
        let index = this.findMusicIndex(currentMusicItem);
        let newIndex = null;
        let musicListLength = musicList.length;
        if(type === 'next'){
            newIndex =  (index+1) % musicListLength;
        } else {
            newIndex =  (index-1+musicListLength) % musicListLength;
        }
        this.playMusic(musicList[newIndex])
    }

    componentDidMount() {
        $('#player').jPlayer({
            supplied: 'mp3',
            wmode: 'window'
        });
        this.playMusic(this.state.currentMusicItem);
        $('#player').bind($.jPlayer.event.ended, (e) => {
            this.playNext();
        })
        Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
            this.setState({
                musicList: this.state.musicList.filter(item =>{
                    return item!==musicItem
                })
            })
        })
        Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMusic(musicItem)
        });
        Pubsub.subscribe('PLAY_PREV', () => {
            this.playNext('prev')
        });
        Pubsub.subscribe('PLAY_NEXT', () => {
            this.playNext('next')
        });
    }

    componentWillUnmount() {
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PLAY_PREV');
        Pubsub.unsubscribe('PLAY_NEXT');
        $('#player').unbind($.jPlayer.event.ended);     
    }

    render() {
        const { currentMusicItem,musicList } = this.state;
        return (
            <div>
                <Router>
                    <Switch> 
                        <Route path="/" render={()=><Player currentMusicItem={currentMusicItem}/>} exact />
                        <Route  path='/list' render={()=><MusicList musicList={musicList} currentMusicItem={currentMusicItem} /> }/>   
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Root;