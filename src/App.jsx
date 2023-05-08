import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square'

import { TURNS } from './utils/constants'
import { checkEndGame, checkWinner } from './utils/board'
import { WinnerModal } from './components/WinnerModal'

function App() {
	const [board, setBoard] = useState(Array(9).fill(null))

	const [turn, setTurn] = useState(TURNS.X)
	// null si hay un ganador, false si hay un empate
	const [winner, setWinner] = useState(null)

	const resetGame = () => {
		setBoard(Array(9).fill(null))
		setTurn(TURNS.X)
		setWinner(null)
	}

	const updateBoard = (index) => {
		// no se actualiza la posición si ya tiene algo
		if (board[index] || winner) return
		// actualiza el tablero
		const newBoard = [...board]
		newBoard[index] = turn
		setBoard(newBoard)
		// cambiar el turno
		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
		setTurn(newTurn)
		// revisar si hay ganador
		const newWinner = checkWinner(newBoard)
		if (newWinner) {
			confetti()
			setWinner(newWinner)
		} else if (checkEndGame(newBoard)) {
			setWinner(false)
		}
	}

	return (
		<main className='board'>
			<h1>Tic tac toe</h1>
			<button onClick={resetGame}>Reset del juego</button>
			<section className='game'>
				{board.map((square, index) => (
					<Square key={index} index={index} updateBoard={updateBoard}>
						{square}
					</Square>
				))}
			</section>

			<section className='turn'>
				<Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
				<Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
			</section>

			<WinnerModal resetGame={resetGame} winner={winner} />
		</main>
	)
}

export default App
