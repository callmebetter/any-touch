<template>
    <canvas width="1000" height="800" class="crop-panel"></canvas>
</template>

<script>
import AnyTouch from '../../../packages/any-touch/dist/any-touch.umd';
export default {
    name: 'CropPanel',

    props: {
        img: {
            type: Image
        }
    },

    data() {
        return {
            context: null,
            orgX: 0,
            orgY: 0,
            scale: 1,
            roation: 0,
            offsetX: 0,
            offsetY: 0
        };
    },

    watch: {
        img: {
            immediate: true,
            handler() {
                console.log(123456);
            }
        }
    },

    mounted() {
        this.$el.width = this.img.width;
        this.$el.height = this.img.height;
        this.context = this.$el.getContext('2d');
        this.context.drawImage(this.img, 0, 0);
        this.drawRect();
        // this.context.rect(50, 20, 200, 120);
        // this.context.clip();
        // this.context.fillRect(0, 0, 200, 120);
    },

    methods: {
        drawRect() {
            this.context.save();
            this.context.fillStyle = 'rgba(0,0,0,0.4)';
            this.context.fillRect(0, 0, 300, 300);
            this.context.restore();
        }
    }
};
</script>

<style scope lang="scss">
.crop-panel {
    width: 100%;
}
</style>