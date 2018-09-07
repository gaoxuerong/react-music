import React from 'react'
import Progress from '../components/progress'
import Header from '../components/header';
import './player.less'
import { Link } from 'react-router-dom';
import Pubsub from 'pubsub-js'

let duration = null;

class Player extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            progress: 0,
            volume: 0,
            isPlay: true,
            leftTime: ''
        }
    }
    static defaultProps = {
        volumeBarColor: '#aaa',
        playBarColor: '#3a9'
    }
    playPrev() {
        Pubsub.publish('PLAY_PREV')
        this.setState({
            isPlay: true
        })
    }
    playNext() {
        Pubsub.publish('PLAY_NEXT')
        this.setState({
            isPlay: true
        })
    }
    format(leftTime) {
        let min = Math.floor(leftTime/60)
        let second = Math.floor(leftTime % 60)
        second = second <10 ? `0${second}` : `${second}`
        return  `${min}:${second}`;
    }
    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            let agoProgress = e.jPlayer.status.currentPercentAbsolute;
            this.setState({
                volume: e.jPlayer.options.volume * 100,
                progress: agoProgress,
                leftTime: duration*(1-agoProgress/100),
            });
        });
    }
    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.timeupdate)
    }
    progressChangeHandler(progress) {
        $('#player').jPlayer('play', duration * progress)
    }
    changeVolumeHandler(volumeProgress) {
        $('#player').jPlayer('volume', volumeProgress)
    }
    play() {
        const { isPlay } = this.state;
        (isPlay) ? $('#player').jPlayer('pause') : $('#player').jPlayer('play')
        this.setState({
            isPlay: !isPlay
        })
    }
    render() {
        const { progress,volume,isPlay,leftTime } = this.state;
        const { currentMusicItem, volumeBarColor, playBarColor } = this.props;
        return (
            <div>
                <Header />
                <div className="player-page">
                    <h1 className="caption"><Link to="/list">love &gt;</Link></h1>
                    <div className="mt20 row">
                        <div className="controll-wrapper">
                            <h2 className="music-title">{currentMusicItem.title}</h2>
                            <h3 className="music-artist mt10">{currentMusicItem.artist}</h3>
                            <div className="row mt20">
                                <div className="left-time  -col-auto">{this.format(leftTime)}</div>
                                <div className="volume-container">
                                    <i className="icon-volume rt" style={{top: 5,left: -5}}></i>
                                    <div className="volume-wrapper">
                                        <Progress
                                            progress={volume}
                                            onProgressChange={this.changeVolumeHandler.bind(this)}
                                            barColor={volumeBarColor}
                                        >
                                        </Progress>
                                    </div>
                                </div>
                            </div>
                            <div style={{height: 10, lineHeight: '10px'}}>
                                <Progress
                                    progress={progress}
                                    onProgressChange={this.progressChangeHandler.bind(this)}
                                    barColor={playBarColor}
                                >
                                </Progress>
                            </div>
                            <div className="mt35 row">
                                <div>
                                    <i className="icon prev" onClick={this.playPrev.bind(this)}></i>
                                    <i className={`icon ml20 ${isPlay ? 'pause' : 'play'}`} onClick={this.play.bind(this)}></i>
                                    <i className="icon next ml20" onClick={this.playNext.bind(this)}></i>
                                </div>
                            </div>
                        </div>
                        <div className="-col-auto cover">
                            <img src={currentMusicItem.cover} alt={currentMusicItem.title} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Player;