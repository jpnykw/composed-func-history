(() => {
    const buffer = [];

    window.addEventListener('DOMContentLoaded', () => {
        const player = new Position(0, 0);
        const size = new Position(8, 4);
        const game = new Game(player, size);

        // Draw initialize
        const stage = document.querySelector('.stage');
        const status = document.querySelectorAll('.status');

        for (let y = 0; y < size.y; y++) {
            const line = document.createElement('div');
            line.classList.add('line');

            for (let x = 0; x < size.x; x++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.classList.add(`${x}-${y}`);
                if (player.x === x && player.y === y) cell.classList.add('player');
                line.appendChild(cell);
            }

            stage.appendChild(line);
        }

        // Controller
        document.body.addEventListener('keydown', (event) => {
            const beforeGame = Object.assign({}, game);

            buffer[event.keyCode] = true;
            if (buffer[37]) game.update(game.l);
            if (buffer[39]) game.update(game.r);
            if (buffer[38]) game.update(game.u);
            if (buffer[40]) game.update(game.d);
            if (buffer[17] && buffer[90]) game.undo();

            // Calculate
            game.calc();

            // Update screen
            if (beforeGame !== game) {
                const beforePlayer = [...document.querySelectorAll('.cell')].filter(cell => {
                    const x = beforeGame.px;
                    const y = beforeGame.py;
                    return cell.className.includes(`${x}-${y}`)
                })[0];

                const currentPlayer = [...document.querySelectorAll('.cell')].filter(cell => {
                    const x = game.px;
                    const y = game.py;
                    return cell.className.includes(`${x}-${y}`)
                })[0];

                beforePlayer.classList.remove('player');
                currentPlayer.classList.add('player');

                let [g, h] = ['i', ''];
                game.history.map(f => {
                    g = `${f}(${g})`;
                    h = h === '' ? f : `${f} ∘ ${h}`;
                });

                status[0].innerText = `= ${g}`;
                status[1].innerText = `= (${h})(i)`;
                console.log(game);
            }
        })

        document.body.addEventListener('keyup', (event) => {
            buffer[event.keyCode] = false;
        })
    })
})()
