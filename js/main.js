// 初始化AOS
AOS.init({
    duration: 1000,
    once: true
});

// 照片数据
const photos = {
    memories: [
        { url: 'images/1.jpg', date: '2023-01-01', caption: '我们的第一张合照' },
        { url: 'images/2.jpg', date: '2023-06-15', caption: '一起看日落' },
        { url: 'images/3.jpg', date: '2023-12-25', caption: '圣诞节快乐' },
        { url: 'images/4.jpg', date: '2024-02-14', caption: '情人节快乐' }
    ],
    romantic: [
        { url: 'images/5.jpg', message: '希望你每天开心' },
        { url: 'images/6.jpg', message: '想和你一起看星星' },
        { url: 'images/7.jpg', message: '想牵着你的手散步' }
    ],
    future: [
        { url: 'images/8.jpg', promise: '未来，我们要去巴黎' },
        { url: 'images/9.jpg', promise: '未来，我们要环游世界' },
        { url: 'images/10.jpg', promise: '未来，我们要一起变老' }
    ]
};

// 创建花瓣
const createPetals = () => {
    const container = document.querySelector('.petals');
    const petalCount = 30;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDelay = `${Math.random() * 10}s`;
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(petal);
    }
};

// 初始化轮播
const initSwipers = () => {
    // 时光记忆轮播
    const memoriesSwiper = new Swiper('.memories-swiper', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.timeline',
            type: 'progressbar'
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });

    // 此刻浪漫轮播
    const romanticSwiper = new Swiper('.romantic-swiper', {
        effect: 'cube',
        grabCursor: true,
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });

    // 未来约定轮播
    const futureSwiper = new Swiper('.future-swiper', {
        effect: 'cards',
        grabCursor: true,
        direction: 'vertical',
        mousewheel: true,
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true
        }
    });

    // 添加轮播内容
    photos.memories.forEach(photo => {
        memoriesSwiper.appendSlide(`
            <div class="swiper-slide">
                <img src="${photo.url}" alt="${photo.caption}">
                <div class="photo-info">
                    <div class="date">${photo.date}</div>
                    <div class="caption">${photo.caption}</div>
                </div>
            </div>
        `);
    });

    photos.romantic.forEach(photo => {
        romanticSwiper.appendSlide(`
            <div class="swiper-slide">
                <img src="${photo.url}" alt="浪漫时刻">
                <div class="message">${photo.message}</div>
            </div>
        `);
    });

    photos.future.forEach(photo => {
        futureSwiper.appendSlide(`
            <div class="swiper-slide">
                <img src="${photo.url}" alt="未来约定">
                <div class="promise">${photo.promise}</div>
            </div>
        `);
    });
};

// 初始化照片查看
const initPhotoViewer = () => {
    const modal = document.querySelector('.photo-modal');
    const modalImg = modal.querySelector('img');
    const modalDate = modal.querySelector('.photo-date');
    const closeBtn = modal.querySelector('.close-modal');

    document.querySelectorAll('.memories-swiper .swiper-slide').forEach(slide => {
        slide.addEventListener('click', () => {
            const img = slide.querySelector('img');
            const date = slide.querySelector('.date').textContent;
            modalImg.src = img.src;
            modalDate.textContent = date;
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
};

// 初始化时间胶囊
const initTimeCapsule = () => {
    const modal = document.querySelector('.time-capsule-modal');
    const textarea = modal.querySelector('textarea');
    const saveBtn = modal.querySelector('.save-promise');
    const closeBtn = modal.querySelector('.close-modal');

    document.querySelectorAll('.future-swiper .swiper-slide').forEach(slide => {
        slide.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    });

    saveBtn.addEventListener('click', () => {
        if (textarea.value.trim()) {
            localStorage.setItem('timeCapsule', textarea.value);
            alert('承诺已保存在时间胶囊中！');
            modal.style.display = 'none';
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
};

// 初始化页脚爱心
const initFloatingHearts = () => {
    const container = document.querySelector('.floating-hearts');
    const heartCount = 15;
    let clickCount = 0;

    // 创建漂浮爱心
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.left = `${Math.random() * 90 + 5}%`;
        heart.style.bottom = `${Math.random() * 60 + 20}%`;
        heart.style.fontSize = `${Math.random() * 20 + 20}px`;
        heart.style.animationDelay = `${Math.random() * 3}s`;
        heart.style.opacity = '0.7';
        container.appendChild(heart);

        // 添加点击效果
        heart.addEventListener('click', () => {
            heart.style.transform = 'scale(1.5)';
            heart.style.color = '#ff1493';
            setTimeout(() => {
                heart.style.transform = 'scale(1)';
                heart.style.color = '';
            }, 500);
        });
    }

    // 彩蛋触发区域
    const secretTrigger = document.querySelector('.secret-trigger');
    secretTrigger.style.cursor = 'pointer';
    
    // 点击计数和效果
    secretTrigger.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            createRoseRain();
            alert('我爱你！');
            // 重置点击计数
            clickCount = 0;
        }
    });
};

// 创建玫瑰花雨效果
const createRoseRain = () => {
    const container = document.querySelector('.particles-container');
    if (!container) {
        const newContainer = document.createElement('div');
        newContainer.className = 'particles-container';
        document.body.appendChild(newContainer);
    }

    const roseCount = 50;
    const colors = ['#FFB7C5', '#FF69B4', '#DB7093'];

    for (let i = 0; i < roseCount; i++) {
        const rose = document.createElement('div');
        rose.className = 'petal';
        rose.style.left = `${Math.random() * 100}%`;
        rose.style.animationDelay = `${Math.random() * 5}s`;
        rose.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        rose.style.width = `${Math.random() * 15 + 10}px`;
        rose.style.height = `${Math.random() * 15 + 10}px`;
        container.appendChild(rose);

        setTimeout(() => {
            rose.remove();
        }, 10000);
    }
};

// 检查是否启用烛光模式
const checkCandleMode = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 18 && hour < 20) {
        document.body.classList.add('candle-mode');
    }
};

// 初始化背景音乐
const initBackgroundMusic = () => {
    const music = document.getElementById('background-music');
    const musicToggle = document.querySelector('.music-toggle');

    // 尝试自动播放
    const tryAutoplay = async () => {
        try {
            await music.play();
            musicToggle.classList.remove('paused');
        } catch (error) {
            console.log('自动播放失败，等待用户交互');
            musicToggle.classList.add('paused');
            
            // 添加一次性点击事件监听器
            const playOnClick = async () => {
                try {
                    await music.play();
                    musicToggle.classList.remove('paused');
                } catch (error) {
                    console.log('播放失败:', error);
                }
            };
            
            document.addEventListener('click', playOnClick, { once: true });
        }
    };

    // 页面加载完成后尝试自动播放
    tryAutoplay();

    // 音乐控制按钮点击事件
    musicToggle.addEventListener('click', () => {
        if (music.paused) {
            music.play().then(() => {
                musicToggle.classList.remove('paused');
            }).catch(error => console.log('播放失败:', error));
        } else {
            music.pause();
            musicToggle.classList.add('paused');
        }
    });

    // 监听音乐播放状态
    music.addEventListener('play', () => {
        musicToggle.classList.remove('paused');
    });

    music.addEventListener('pause', () => {
        musicToggle.classList.add('paused');
    });
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    createPetals();
    initSwipers();
    initPhotoViewer();
    initTimeCapsule();
    initFloatingHearts();
    initBackgroundMusic();
    checkCandleMode();

    // 检查是否是妇女节
    const today = new Date();
    if (today.getMonth() === 2 && today.getDate() === 8) {
        setTimeout(createRoseRain, 1000);
    }
}); 