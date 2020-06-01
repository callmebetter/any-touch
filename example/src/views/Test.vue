<template>
    <canvas class="crop-panel" :width="width" :height="height" @panmove="onPanmove"></canvas>
</template>

<script>
import AnyTouch from '../../../packages/any-touch/dist/any-touch.umd';
import loadImage from './loadImage';
export default {
    name: 'CropPanel',

    props: {
        source: {
            type: Object
        },

        crop: {
            type: Object
        },

        scale: {
            type: Number,
            default: 1
        },

        org: {
            type: Array,
            default: () => [0, 0]
        },

        angle: {
            type: Number,
            default: 0
        }
    },

    data() {
        return {
            context: null,
            width: 0,
            height: 0,
            postion: [0, 0],
            offsetX: 0,
            offsetY: 0,
            deltaOrg: [0, 0],
            lastOrg: [...this.org]
        };
    },

    computed: {
        moveRate() {
            return this.$el?.offsetWidth / this.width;
        },
        transform() {
            const { scale, org, angle } = this;
            return { scale, org, angle };
        }
    },

    watch: {
        transform() {
            this.$nextTick(() => {
                this.drawBg();
            });
        },
        source: {
            // immediate: true,
            handler() {
                this.$nextTick(() => {
                    this.drawBg();
                });
            }
        }
    },

    mounted() {
        new AnyTouch(this.$el);
        const { width, height } = this.crop;

        this.context = this.$el.getContext('2d');
        this.height = height;
        this.width = width;
        this.$nextTick(() => {
            this.drawBg();
        });
    },

    methods: {
        onPanmove({ deltaX, deltaY }) {
            const dx = deltaX / this.moveRate / this.scale;
            const dy = deltaY / this.moveRate / this.scale;
            const rad = (this.angle * Math.PI) / 180;
            if (0 === rad % Math.PI) {
                this.offsetX += dx;
                this.offsetY += dy;
            } else {
                this.offsetX += Math.cos(rad) * dx + Math.sin(rad) * dy;
                this.offsetY += -Math.sin(rad) * dx + Math.cos(rad) * dy;
            }

            this.drawBg();
        },

        getPeak() {},

        drawBg() {
            const { context } = this;
            // 初始值
            const { x, y, width, height } = this.crop;
            const rad = (this.angle * Math.PI) / 180;
            context.clearRect(0, 0, this.width, this.height);
            this.drawChessboard();

            context.save();
            context.translate(this.org[0], this.org[1]);
            context.scale(this.scale, this.scale);
            context.rotate(rad);
            context.translate(-this.org[0], -this.org[1]);
            // this.offsetX += Math.cos(rad) * dx + Math.sin(rad) * dy;
            // this.offsetY += -Math.sin(rad) * dx + Math.cos(rad) * dy;
            this.deltaOrg = [this.org[0] - this.lastOrg[0], this.org[1] - this.lastOrg[1]];
            const newOrg = this.swtichCoordinate(this.org);
            console.warn(newOrg);

            this.postion[0] = this.offsetX;
            this.postion[1] = this.offsetY;
            console.log(this.postion)
            context.fillRect(this.postion[0], this.postion[1], this.width, this.height);
            this.lastOrg = [...this.org];
            // context.drawImage(
            //     this.source.img,
            //     x,
            //     y,
            //     width,
            //     height,
            //     -this.org[0] / this.scale - d[0] + this.offsetX,
            //     -this.org[1] / this.scale - d[1] + this.offsetY,
            //     this.width,
            //     this.height
            // );
            context.fillStyle = '#d10';
            context.fillRect(-10, -10, 20, 20);

            context.restore();
        },

        swtichCoordinate(point) {
            const [x, y] = point;
            const rad = (this.angle * Math.PI) / 180;
            return [
                (-Math.cos(rad) * x - Math.sin(rad) * y) / this.scale,
                (Math.sin(rad) * x - Math.cos(rad) * y) / this.scale
            ];
        },

        drawRect() {
            const { width, height } = this.img;
            this.context.save();
            this.context.fillStyle = 'rgba(0,0,0,0.6)';
            this.context.fillRect(0, 0, width, height);
            this.context.restore();
        },

        drawNineGrid(startX, startY, viewWidth, viewHeight) {
            const context = this.context;
            const max = 3;
            const each = [viewWidth / max, viewHeight / max];
            context.save();
            context.strokeStyle = '#fff';

            for (let i = 0; i <= max; i++) {
                // Y轴
                const x = each[0] * i;
                context.moveTo(startX + x, startY);
                context.lineTo(startX + x, startY + viewHeight);

                // X轴
                const y = each[1] * i;
                context.moveTo(startX, startY + y);
                context.lineTo(startX + viewWidth, startY + y);
            }
            context.stroke();
            context.restore();
        },

        /**
         * 棋盘
         */
        drawChessboard() {
            const context = this.context;
            const count = [40, Math.ceil((40 * this.height) / this.width)];
            const size = this.width / count[0];
            const colorReverse = { '#fff': '#ddd', '#ddd': '#fff' };
            context.save();
            let color = '#ddd';
            let rowStartColor = color;
            for (let i = 0; i <= count[0]; i++) {
                for (let j = 0; j < count[1]; j++) {
                    context.fillStyle = color;
                    const x = 0 + size * i;
                    const y = 0 + size * j;
                    context.fillRect(x, y, size, size);
                    color = colorReverse[color];
                }
                rowStartColor = colorReverse[rowStartColor];
                color = rowStartColor;
            }
            context.stroke();
            context.restore();
        }
    }
};
</script>

<style scope lang="scss">
.crop-panel {
    width: 100%;
    display: block;
    margin: auto;
}
</style>