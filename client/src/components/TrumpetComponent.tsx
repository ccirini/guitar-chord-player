import {useEffect, useState } from "react";
import * as Tone from 'tone';
import '../css/TrumpetComponent.css'

function TrumpetComponent(resolvedNote: string) {
    const [playing, setPlaying] = useState(false);
    const play = () => {
        setPlaying(true);
        const trumpetSampler = new Tone.Sampler({
            urls: {
                "Bb3": "trumpet_bflat3.wav",
                "F4": "trumpet_f4.wav",
                "Bb4": "trumpet_bflat4.wav",
                "D5": "trumpet_d5.wav",
                "F5": "trumpet_f5.wav",
                "Bb5": "trumpet_bflat5.wav"
            },
            release: 1,
            baseUrl: "../sounds/trumpet/"
        }).toDestination();

        Tone.loaded().then(() => {
            trumpetSampler.triggerAttackRelease(resolvedNote, 4);
        })
        setTimeout(() => {
            setPlaying(false);
        }, 20);
    };
    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key.toLowerCase() === "p") {
                play();
            }
        });
    });

    const Button = ({}: any): JSX.Element => {
        return <button id='trumpet-instrument'>
            <img src='../img/trumpet.png' alt='Trumpet Instrument' />
        </button>;
    };

    return (
        <Button className="trumpet" onClick={play} />
    );
}

export default TrumpetComponent;
