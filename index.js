(() => {
    window.addEventListener('DOMContentLoaded', () => {
        const [width, height] = [15, 10];
        const player = new Position(Math.floor(Math.random() * width), Math.floor(Math.random() * height));
        const size = new Position(width, height);
        const game = new Game(player, size);

        // Draw initialize
        const stage = document.querySelector('.stage');
        const status = [...document.querySelectorAll('.status')].map(status => status.querySelector('input'));

        const updateScreen = (beforeGame) => {
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

                status[0].value = `${g}`;
                status[1].value = `(${h})(i)`;
                console.log(game);
            }
        }

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
            if (document.activeElement !== document.body) return;
            const beforeGame = Object.assign({}, game);

            if (event.keyCode === 37) game.update(game.l);
            if (event.keyCode === 39) game.update(game.r);
            if (event.keyCode === 38) game.update(game.u);
            if (event.keyCode === 40) game.update(game.d);
            if (event.keyCode === 90) game.undo();
            console.log(game.history);

            // Calculate
            game.calc();

            // Update screen
            updateScreen(beforeGame);
        });

        status[0].addEventListener('keydown', (event) => {
            if (event.keyCode === 13) {
                const history = status[0].value.replace(/\(/g, ',').replace(/\)/g, '').split(',');
                const beforeGame = Object.assign({}, game);

                // Overwrite history
                history.pop();
                console.log(history);
                game.history = history;

                // Calculate
                game.calc();

                // Update screen
                updateScreen(beforeGame);
            }
        });
    })
})()
