//var React= require('react');
//var videojs = require('video.js');

var VideoJSComponent = React.createClass({
	componentDidMount: function() {
		this.video = videojs(this.refs.videoElement);
		
		var self = this;
		this.video.ready(function() {
			self.props.onLoad();

			this.play();

			this.onEnd(self.props.onEnd);
		})
	},

	render: function() {
		var sources = this.props.src.map(function(source, index) {
			return (<source key={index} src={source.url} type={source.type} />);
		});

		return (<video ref="videoElement" className="video-js vjs-default-skin" preload={this.props.videoPreload}>
			{sources}
		</video>);
	}

});

//module.exports = VideoJSComponent;