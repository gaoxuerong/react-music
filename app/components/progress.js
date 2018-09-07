import React from 'react'
import './progress.less'
class Progress extends React.Component {
    constructor(props) {
        super(props)
    }
    static defaultProps = {
        barColor: '#f76'
    }
    changeProgress(e) {
        const { onProgressChange } = this.props;
        let progressBar = this.refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left)/progressBar.clientWidth
        onProgressChange && onProgressChange(progress)
    }
    render() {
        const { progress,barColor } = this.props;
        return (
            <div 
                className = "components-progress" 
                ref='progressBar'
                onClick={this.changeProgress.bind(this)} 
            >
                <div
                    className="progress"
                    style={{width: `${progress}%`, background: barColor}}
                >
                </div> 
            </div>
        )
    }
}


export default Progress;