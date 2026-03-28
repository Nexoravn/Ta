// =============================================
// SOUND MANAGER - HIỆU ỨNG ÂM THANH
// =============================================

const SoundManager = {
    sounds: {},
    enabled: true,
    volume: 0.6,
    
    // Khởi tạo âm thanh (dùng Web Audio API)
    init() {
        try {
            // Tạo audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Tạo các âm thanh cơ bản
            this.createBeepSound();
            this.createSuccessSound();
            this.createErrorSound();
            this.createTickSound();
            this.createGameOverSound();
            
            console.log('Sound system initialized');
        } catch (e) {
            console.log('Web Audio API not supported');
            this.enabled = false;
        }
    },
    
    // Tạo âm thanh "beep" thông báo
    createBeepSound() {
        this.sounds.beep = () => {
            if (!this.enabled) return;
            try {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.type = 'sine';
                oscillator.frequency.value = 880;
                gainNode.gain.value = this.volume * 0.3;
                
                oscillator.start();
                gainNode.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + 0.3);
                oscillator.stop(this.audioContext.currentTime + 0.3);
            } catch(e) {}
        };
    },
    
    // Tạo âm thanh thành công
    createSuccessSound() {
        this.sounds.success = () => {
            if (!this.enabled) return;
            try {
                const now = this.audioContext.currentTime;
                const frequencies = [523.25, 659.25, 783.99];
                
                frequencies.forEach((freq, i) => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    oscillator.type = 'sine';
                    oscillator.frequency.value = freq;
                    gainNode.gain.value = this.volume * 0.4;
                    
                    oscillator.start(now + i * 0.1);
                    gainNode.gain.exponentialRampToValueAtTime(0.00001, now + i * 0.1 + 0.3);
                    oscillator.stop(now + i * 0.1 + 0.3);
                });
            } catch(e) {}
        };
    },
    
    // Tạo âm thanh lỗi
    createErrorSound() {
        this.sounds.error = () => {
            if (!this.enabled) return;
            try {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.type = 'sawtooth';
                oscillator.frequency.value = 220;
                gainNode.gain.value = this.volume * 0.4;
                
                oscillator.start();
                gainNode.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + 0.2);
                oscillator.stop(this.audioContext.currentTime + 0.2);
            } catch(e) {}
        };
    },
    
    // Tạo âm thanh đếm giây
    createTickSound() {
        this.sounds.tick = () => {
            if (!this.enabled) return;
            try {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.type = 'triangle';
                oscillator.frequency.value = 440;
                gainNode.gain.value = this.volume * 0.2;
                
                oscillator.start();
                gainNode.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + 0.1);
                oscillator.stop(this.audioContext.currentTime + 0.1);
            } catch(e) {}
        };
    },
    
    // Tạo âm thanh game over
    createGameOverSound() {
        this.sounds.gameover = () => {
            if (!this.enabled) return;
            try {
                const now = this.audioContext.currentTime;
                const frequencies = [440, 392, 349, 329];
                
                frequencies.forEach((freq, i) => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    oscillator.type = 'sine';
                    oscillator.frequency.value = freq;
                    gainNode.gain.value = this.volume * 0.3;
                    
                    oscillator.start(now + i * 0.15);
                    gainNode.gain.exponentialRampToValueAtTime(0.00001, now + i * 0.15 + 0.3);
                    oscillator.stop(now + i * 0.15 + 0.3);
                });
            } catch(e) {}
        };
    },
    
    // Phát âm thanh
    play(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName]();
        }
    },
    
    // Bật/tắt âm thanh
    toggle() {
        this.enabled = !this.enabled;
        if (this.enabled && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        return this.enabled;
    }
};

// Khởi tạo khi người dùng tương tác đầu tiên
document.addEventListener('click', () => {
    if (SoundManager.audioContext && SoundManager.audioContext.state === 'suspended') {
        SoundManager.audioContext.resume();
    }
}, { once: true });