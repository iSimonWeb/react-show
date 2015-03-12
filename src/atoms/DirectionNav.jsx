var DirectionNav = React.createClass({

	render: function() {
		return (
			<nav className="direction">
				<button type="button" className="left" onClick={this.props.prev} />
				<button type="button" className="right" onClick={this.props.next} />
			</nav>
		);
	}

});