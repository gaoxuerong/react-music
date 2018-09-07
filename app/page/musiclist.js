import React from 'react'
import MusicListItem from '../components/musiclistitem'
import Header from '../components/header';
class MusicList extends React.Component{
    constructor(props) {
        super(props)
        this.state={
        }
    }

    render() {
         let listEle = null;
         listEle = this.props.musicList.map((item) => {
            return (
                <MusicListItem 
                    focus={item === this.props.currentMusicItem}
                    key={item.id}
                    musicItem={item}
                >
                    {item.title}
                </MusicListItem>
            )
         })
        return (
            <div>
                <Header />
                <ul>{listEle}</ul>
            </div>
        )
    }
}

export default MusicList;