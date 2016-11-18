import React, { Component } from 'react';
import './App.css';

class App extends Component {

	constructor() {
		super();
		this.state = {
			bothImagesLoaded: false,
			cWidth: window.innerWidth,
			cHeight: window.innerWidth * 0.75
		}
	}

	componentDidMount() {

		this.canvas = this.refs.myCanvas;
		this.ctx = this.canvas.getContext('2d');
		this.w = this.canvas.width = window.innerWidth;
		this.h = this.canvas.height = this.w * 0.75;
		this.animationDone = true;
		// this.bothImagesLoaded = false;

		// this.setState({
		// 	cWidth: this.w,
		// 	cHeight: this.h
		// });


		this.ctx.fillStyle = 'hsla(240,50%,50%,1)';
		this.ctx.fillRect(0,0,this.w,this.h);
		this.ctx.textAlign = 'center';
		this.ctx.fillStyle = 'hsla(120,50%,100%,1)';
		this.ctx.font = '20px sans-serif';
		this.ctx.fillText('Loading',this.w/2, this.h/2 + 10);

		let image = new Image();
		this.mist = new Image();
		let imageLoaded = false;
		let mistLoaded = false;

		image.onload = ()=>{
			imageLoaded = true;
			if (imageLoaded && mistLoaded) {
				// animate();
				this.setState({bothImagesLoaded: true});
				// this.bothImagesLoaded = true;
				// this.ctx.drawImage(image,0,0,this.w,this.h);
				this.ctx.drawImage(this.mist,0,0,this.w,this.h);
			}
		};

		this.mist.onload = ()=>{
			mistLoaded = true;
			if (imageLoaded && mistLoaded) {
				// animate();
				this.setState({bothImagesLoaded: true});
				// this.bothImagesLoaded = true;
				// this.ctx.drawImage(image,0,0,this.w,this.h);
				this.ctx.drawImage(this.mist,0,0,this.w,this.h);
			}
		};

		image.src = 'http://assets.myntassets.com/v1479297908/radium/wiper/ImageClean.jpg';
		this.mist.src = 'http://assets.myntassets.com/v1479297909/radium/wiper/ImageMyst.jpg';
		
		const animate = () => {
			window.requestAnimationFrame( animate );
			// this.ctx.fillStyle = 'hsla(240,50%,50%,0.5)';
			// this.ctx.fillStyle = 'hsla(120,50%,50%,0.5)';
			// this.ctx.fillRect(this.w/2 - 50, this.h/2- 50, 100, 100)
		}

		// animate();



	}

	// animate() {
	// 	//http://assets.myntassets.com/v1479297908/radium/wiper/ImageClean.jpg
	// 	//http://assets.myntassets.com/v1479297909/radium/wiper/ImageMyst.jpg
	// 	window.requestAnimationFrame( this.animate );
	// 	this.ctx.fillStyle = 'hsla(240,50%,50%,0.5)';
	// 	this.ctx.fillRect(0,0,this.w,this.h);
	// 	this.ctx.fillStyle = 'hsla(120,50%,50%,0.5)';
	// 	this.ctx.fillRect(this.w/2 - 50, this.h/2- 50, 100, 100)


	// }

	handelTouch(e) {
		clearTimeout(this.mistTimeout);
		if (this.state.bothImagesLoaded && this.animationDone) {

			const r = 20;

			for (var i = e.nativeEvent.touches.length - 1; i >= 0; i--) {
				// e.nativeEvent.touches[i]
				const { clientX, clientY } = e.nativeEvent.touches[i];
				this.ctx.globalCompositeOperation = 'destination-out';
				this.ctx.beginPath();
				this.ctx.arc(clientX,clientY, r, 0, 2*Math.PI);
				this.ctx.fill();
				this.ctx.globalCompositeOperation = 'source-over';
			}

		}
	}

	reRenderMist() {

		let alpha = 0;

		const animate = () => {
			this.animationDone = false;
			alpha += 0.02;
			this.ctx.globalAlpha = alpha;
			this.ctx.drawImage(this.mist,0,0,this.w,this.h);
			if (alpha >= 1) {
				console.log('stop animation');
				this.animationDone = true;
				cancelAnimationFrame(this.animationRequest);
			} else {

				requestAnimationFrame(animate);
			}
		}

		this.animationRequest = requestAnimationFrame(animate);
		console.log('rerender mist');

	}

	handelTouchEnd(e) {
		this.mistTimeout = setTimeout(this.reRenderMist.bind(this), 1000);
	}


  render() {


  	const css = {
  		canvas: {
  			position: 'absolute',
  			top: 0,
  			left: 0
  		},
  		image: {
  			width: '100%',
  			height: 'auto',
  			display: (this.state.bothImagesLoaded) ? 'block' : 'none'
  		},
  		wrapper: {
  			position: 'relative'
  		}
  	}

    return (
      <div className="App">
        Wipe the mist
        <div style={css.wrapper}>
        	<img alt="background" style={css.image} src="http://assets.myntassets.com/v1479297908/radium/wiper/ImageClean.jpg" />
        	<canvas style={css.canvas} onTouchEnd={this.handelTouchEnd.bind(this)} onTouchMove={this.handelTouch.bind(this)} ref="myCanvas"></canvas>
        </div>
        <div>Height: {this.state.cHeight}</div>
        <div>Width: {this.state.cWidth}</div>
        <div>window widht: {window.innerWidth}</div>
      </div>
    );
  }
}

export default App;
