module.exports = function solveSudoku(matrix) {
  // your solution
  function findZero(matrix) {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (matrix[r][c] === 0) return [r, c]
      }
    }
    return null
  }

  function validate(num, pos, matrix) {
    const [r, c] = pos

    for (let i = 0; i < 9; i++) {
      if (matrix[i][c] === num && i !== r) return false
    }

    for (let i = 0; i < 9; i++) {
      if (matrix[r][i] === num && i !== c) return false
    }

    const secR = Math.floor(r / 3) * 3,
      secC = Math.floor(c / 3) * 3

    for (let i = secR; i < secR + 3; i++) {
      for (let j = secC; j < secC + 3; j++) {
        if (matrix[i][j] === num && i !== r && j !== c) return false
      }
    }

    return true
  }


  function solve() {
    const currPos = findZero(matrix)

    if (currPos === null) return true

    for (let i = 1; i < 10; i++) {
      const currNum = i

      const isValid = validate(currNum, currPos, matrix)

      if (isValid) {

        const [r, c] = currPos
        matrix[r][c] = currNum

        if (solve()) return true
        matrix[r][c] = 0
      }
    }
  }
  solve()
  return matrix
}