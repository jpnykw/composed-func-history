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
        if (this.py === 0) return false;
        return true;
    }

    // Down
    d() {
        if (this.py === this.h - 1) return false;
        return true;
    }

    // Left
    l() {
        if (this.px === 0) return false;
        return true;
    }

    // Right
    r() {
        if (this.px === this.w - 1) return false;
        return true;
    }
    
    update(method) {
        const bindMethod = method.bind(this);
        const result = bindMethod();
        if (!result) return;

        this.history.push(method);
        console.log('moved');
    }

    undo() {
        const lastMoved = this.history[this.history.length - 1];
        this.history.pop();
        console.log('undo');
    }

    calc() {
        this.px = this.player.x;
        this.py = this.player.y;
        this.history.map(f => {
            const way = f.toString()[0];
            if (way === 'l') this.px -= 1;
            if (way === 'r') this.px += 1;
            if (way === 'u') this.py -= 1;
            if (way === 'd') this.py += 1;
        })
    }
}

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
