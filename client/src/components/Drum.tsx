import {useEffect, useState } from "react";
import * as Tone from 'tone';
import './Drum.css'

function Drum(props: { sound: string; letter: string; img: string}) {
	    const [playing, setPlaying] = useState(false);
	    const play = () => {
		setPlaying(true);	
		const player = new Tone.Player(props.sound).toDestination();
	    player.autostart = true;
	//	player.reverse = true;
  //	console.log(playing)
		setTimeout(() => {	
			setPlaying(false);
		}, 20);
	};
	useEffect(() => {
		document.addEventListener("keydown", (e) => {
			if (e.key.toLowerCase() ===  props.letter.toLowerCase()) {
				play();
			}
		});
	});


	const Button = ({ children }: any): JSX.Element =>{  
		return <button id="drum-instrument-key">
			<img src={props.img} alt='' height={85} width={90}/> 
			<div className='key-kbd'><kbd>{props.letter} </kbd></div>
		</button>;
	  };
	
	return (
		<div className={`drum ${playing ? "playing" : ""}`} onClick={play}>
			<Button className="ripple"/>
		</div>
	);
}

export default Drum;
