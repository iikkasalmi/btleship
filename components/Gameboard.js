import React, {useState, useEffect, useRef} from 'react';
import {Text, View, Pressable} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import styles from '../style/style';

export default function Gameboard() {

    const START = 'plus';
    const MISS = 'cross';
    const HIT = 'circle';

    let initialBoard = [
    START, START, START,
    START, START, START,
    START, START, START,
    START, START, START,
    START, START, START,
    START, START, START,
    START, START, START,
    START, START, START,
    START];

    const Status = {
    notStarted: "Game has not started",
    clickFirst: "Click the start button first...",
    gameOn: "Game is on...",
    won: "You sinked all the ships",
    lostTime: "Timeout. Ships remaining",
    lostBombs: "Game over. Ships remaining."
    };

    const [seconds, setSeconds] = useState(0);
    const [status, setStatus] = useState(Status.notStarted);
    const [board, setBoard] = useState(initialBoard);
    const [bombs, setBombs] = useState(15);
    const [ships, setShips] = useState(3);
    const [hits, setHits] = useState(0);
    const timerRef = useRef();
    const [isToggleOn,setToggleOn] = useState(true);
    const [firstShip, setFirstShip] = useState();
    const [secondShip, setSecondShip] = useState();
    const [thirdShip, setThirdShip] = useState();

    useEffect(() => { 
        gameEnded();
    }, [seconds,ships,bombs,hits])

    function startTimer() {
        const id = setInterval(() => {
            setSeconds(seconds => seconds + 1);     
        }, 1000);
        timerRef.current = id;
    }

    function stopTimer() {
        clearInterval(timerRef.current);
    }

    function handleClick(){
        setToggleOn(!isToggleOn);
        if (isToggleOn) { 
        startGame();
        } 
        else {
        resetGame();
        }
    }

    function startGame() {
        startTimer();
        setStatus(Status.gameOn);
        let ship1 = Math.floor(Math.random() * board.length);
        let ship2 = Math.floor(Math.random() * board.length);
        let ship3 = Math.floor(Math.random() * board.length);
        if (ship2 === ship1 || ship2 === ship3) {
            ship2 = Math.floor(Math.random() * board.length);
        }
        else if (ship3 === ship2 || ship3 === ship1) {
            ship3 = Math.floor(Math.random() * board.length);
        }
        else {
            setFirstShip(ship1);
            setSecondShip(ship2);
            setThirdShip(ship3);
            setShips(3);
        }
    }

    function check(number) {
        if (status != Status.gameOn) {
            setStatus(Status.clickFirst);
        }
        else {
            setBombs(bombs -1);        
            if(board[number] === START) {
                if (number === firstShip || number === secondShip || number === thirdShip) { 
                board[number] = HIT;
                setShips(ships - 1);
                setHits(hits + 1);
            }
            else {
                board[number] = MISS;
            }
        }    
    }  
}
 
    function chooseItemColor(number) {
        if (board[number] === MISS) {
            return "#FF3031";
        }   else if (board[number] === HIT) {
            return "#45CE30";
        }   else {
            return "#74B9FF";
        }
    }


    function gameEnded() {
        if (ships === 0) {
            setStatus(Status.won);
            stopTimer();         
        }
        if (seconds === 30) {
            setStatus(Status.lostTime);
            stopTimer();
        }
        if (bombs === 0) {
            setStatus(Status.lostBombs);
            stopTimer();
        }
        if (bombs === 0 && ships === 0) {
            setStatus(Status.won);
            stopTimer();
        }
    }

    function resetGame() {
        stopTimer();
        setBombs(15);
        setHits(0);
        setShips(3);
        setSeconds(0);
        setBoard(initialBoard);
        setStatus(Status.notStarted);
    }

        return (
            <View style={styles.gameboard}>
                <View style={styles.flex}>
                <Pressable key={0} style={styles.row} onPress={() => check(0)}>
                    <Entypo key={0} name={board[0]} size={32} color={chooseItemColor(0)} />
                </Pressable>
                <Pressable key={1} style={styles.row} onPress={() => check(1)}>
                    <Entypo key={1} name={board[1]} size={32} color={chooseItemColor(1)} />
                </Pressable>
                <Pressable key={2} style={styles.row} onPress={() => check(2)}>
                    <Entypo key={2} name={board[2]} size={32} color={chooseItemColor(2)} />
                </Pressable>
                <Pressable key={3} style={styles.row} onPress={() => check(3)}>
                    <Entypo key={3} name={board[3]} size={32} color={chooseItemColor(3)} />
                </Pressable>
                <Pressable key={4} style={styles.row} onPress={() => check(4)}>
                    <Entypo key={4} name={board[4]} size={32} color={chooseItemColor(4)} />
                </Pressable>
                </View>
                <View style={styles.flex}>
                <Pressable key={5} style={styles.row} onPress={() => check(5)}>
                    <Entypo key={5} name={board[5]} size={32} color={chooseItemColor(5)} />
                </Pressable>
                <Pressable key={6} style={styles.row} onPress={() => check(6)}>
                    <Entypo key={6} name={board[6]} size={32} color={chooseItemColor(6)} />
                </Pressable>
                <Pressable key={7} style={styles.row} onPress={() => check(7)}>
                    <Entypo key={7} name={board[7]} size={32} color={chooseItemColor(7)} />
                </Pressable>
                <Pressable key={8} style={styles.row} onPress={() => check(8)}>
                    <Entypo key={8} name={board[8]} size={32} color={chooseItemColor(8)} />
                </Pressable>
                <Pressable key={9} style={styles.row} onPress={() => check(9)}>
                    <Entypo key={9} name={board[9]} size={32} color={chooseItemColor(9)} />
                </Pressable>
                </View>
                <View style={styles.flex}>
                <Pressable key={10} style={styles.row} onPress={() => check(10)}>
                    <Entypo key={10} name={board[10]} size={32} color={chooseItemColor(10)} />
                </Pressable>
                <Pressable key={11} style={styles.row} onPress={() => check(11)}>
                    <Entypo key={11} name={board[11]} size={32} color={chooseItemColor(11)} />
                </Pressable>
                <Pressable key={12} style={styles.row} onPress={() => check(12)}>
                    <Entypo key={12} name={board[12]} size={32} color={chooseItemColor(12)} />
                </Pressable>
                <Pressable key={13} style={styles.row} onPress={() => check(13)}>
                    <Entypo key={13} name={board[13]} size={32} color={chooseItemColor(13)} />
                </Pressable>
                <Pressable key={14} style={styles.row} onPress={() => check(14)}>
                    <Entypo key={14} name={board[14]} size={32} color={chooseItemColor(14)} />
                </Pressable>
                </View>
                <View style={styles.flex}>
                <Pressable key={15} style={styles.row} onPress={() => check(15)}>
                    <Entypo key={15} name={board[15]} size={32} color={chooseItemColor(15)} />
                </Pressable>
                <Pressable key={16} style={styles.row} onPress={() => check(16)}>
                    <Entypo key={16} name={board[16]} size={32} color={chooseItemColor(16)} />
                </Pressable>
                <Pressable key={17} style={styles.row} onPress={() => check(17)}>
                    <Entypo key={17} name={board[17]} size={32} color={chooseItemColor(17)} />
                </Pressable>
                <Pressable key={18} style={styles.row} onPress={() => check(18)}>
                    <Entypo key={18} name={board[18]} size={32} color={chooseItemColor(18)} />
                </Pressable>
                <Pressable key={19} style={styles.row} onPress={() => check(19)}>
                    <Entypo key={19} name={board[19]} size={32} color={chooseItemColor(19)} />
                </Pressable>
                </View>
                <View style={styles.flex}>
                <Pressable key={20} style={styles.row} onPress={() => check(20)}>
                    <Entypo key={20} name={board[20]} size={32} color={chooseItemColor(20)} />
                </Pressable>
                <Pressable key={21} style={styles.row} onPress={() => check(21)}>
                    <Entypo key={21} name={board[21]} size={32} color={chooseItemColor(21)} />
                </Pressable>
                <Pressable key={22} style={styles.row} onPress={() => check(22)}>
                    <Entypo key={22} name={board[22]} size={32} color={chooseItemColor(22)} />
                </Pressable>
                <Pressable key={23} style={styles.row} onPress={() => check(23)}>
                    <Entypo key={23} name={board[23]} size={32} color={chooseItemColor(23)} />
                </Pressable>
                <Pressable key={24} style={styles.row} onPress={() => check(24)}>
                    <Entypo key={24} name={board[24]} size={32} color={chooseItemColor(24)} />
                </Pressable>
                </View>
                 <Pressable style={styles.button} onPress={() => handleClick()}>
                <Text style={styles.buttonText}>{isToggleOn ? "Start game" : "New game"}</Text>
            </Pressable>
            <Text style={styles.gameinfo}>Hits: {hits} Bombs: {bombs} Ships: {ships}</Text>
            <Text style={styles.gameinfo}>Time: {seconds} </Text>
            <Text style={styles.gameinfo}>Status: {status}</Text>
            </View>
        )
    }
