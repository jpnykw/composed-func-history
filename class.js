class Game {
    constructor(player, size) {
        // Player
        this.player = player;
        this.px = player.x;
        this.py = player.y;

        // Size
        this.w = size.x;
        this.h = size.y;

        // Record history
        this.history = [];
    }

    // Up
    u() {
        return this.py === 0;
    }

    // Down
    d() {
        return this.py === this.h - 1;
    }

    // Left
    l() {
        return this.px === 0;
    }

    // Right
    r() {
        return this.px === this.w - 1;
    }
    
    update(method) {
        if (method.bind(this)()) return;
        this.history.push(method.toString()[0]);
        console.log('moved');
    }

    undo() {
        this.history.pop();
        console.log('undo');
    }

    calc() {
        // Reset
        this.px = this.player.x;
        this.py = this.player.y;
        // Calculate
        this.history.map(f => {
            if (f === 'l') this.px -= 1;
            if (f === 'r') this.px += 1;
            if (f === 'u') this.py -= 1;
            if (f === 'd') this.py += 1;
        })
    }
}

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
