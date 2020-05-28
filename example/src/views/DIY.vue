<template>
    <article>
        <ButtonLoadFile @loaded="onImageLoaded"></ButtonLoadFile>
        <!-- <Sort :images="imgs"/> -->
        <SlickList
            class="preview"
            v-model="imgs"
            :pressDelay="200"
            lockAxis="x"
            axis="x"
            helperClass="sort-active"
        >
            <SlickItem
                class="preview__item"
                v-for="(img,index) in imgs"
                :index="index"
                :key="index"
            >
                <img :src="img.crop.dataURL" width="100%" />
            </SlickItem>
        </SlickList>
        <CropPanel v-if="imgs[0]" :img="imgs[0].source.img" ></CropPanel>
    </article>
</template>

<script>
import AnyTouch from '../../../packages/any-touch/dist/any-touch.umd';
import ButtonLoadFile from './ButtonLoadFile';
import CropPanel from './CropPanel';

import { SlickList, SlickItem } from 'vue-slicksort';
export default {
    name: 'DIY',

    components: { ButtonLoadFile, CropPanel, SlickList, SlickItem },

    data() {
        return { imgs: [], list: ['x1', 'x2', 'x3', 'x4', 'x5'] };
    },

    mounted() {},

    methods: {
        onImageLoaded(imgs) {
            this.imgs = imgs;
        }
    }
};
</script>

<style scope lang="scss">
.sort-active {
    opacity: 0.8;
    cursor: move;
}
.preview {
    display: flex;
    overflow-x: auto;
    &__item {
        width: 150px;
    }
}
</style>