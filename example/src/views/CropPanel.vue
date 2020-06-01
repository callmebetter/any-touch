<template>
    <article class="crop-panel">
        <img ref="crop" :src="source.url" style="width:100%;" />
        <button @click="rotateTo">rotateTo</button>
        <button @click="toDataURL">toDataURL</button>
        <img v-if="previewURL" :src="previewURL" width="300" />
    </article>
</template>

<script>
import AnyTouch from '../../../packages/any-touch/dist/any-touch.umd';
import loadImage from './loadImage';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
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
            cropper: null,
            previewURL: ''
        };
    },

    watch: {},

    mounted() {
        this.cropper = new Cropper(this.$refs.crop, {
            dragMode: 'move',
            aspectRatio: 426 / 269,
            autoCropArea: 1,
            preview: this.$refs.preview,
            data: this.crop
        });
    },

    methods: {
        toDataURL() {
            this.previewURL = this.cropper.getCroppedCanvas().toDataURL('image/jpeg');
            this.$emit('crop', { url: this.previewURL, ...this.cropper.getData() });
        },

        rotateTo() {
            this.cropper.rotate(15);
        },
        drawBg() {
            context.save();
            context.restore();
        }
    }
};
</script>

<style scope lang="scss">
.crop-panel {
    width: 100%;
    height: 300px;
    display: block;
    margin: auto;
}
</style>