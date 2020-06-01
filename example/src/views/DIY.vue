<template>
    <main>
        <article v-if="!isShowCrop">
            <ButtonLoadFile @loaded="onImageLoaded"></ButtonLoadFile>
            <SlickList
                class="preview"
                v-model="imgs"
                :pressDelay="200"
                lockAxis="x"
                axis="x"
                helperClass="sort-active"
            >
                <SlickItem
                    @click.native="onClickThumb(index)"
                    class="preview__item"
                    v-for="(img,index) in imgs"
                    :index="index"
                    :key="index"
                >
                    <img :src="img.crop.url" width="100%" />
                </SlickItem>
            </SlickList>
        </article>

        <!-- crop -->
        <article v-else>
            <CropPanel
                :source="imgs[this.activeIndex].source"
                :crop="imgs[this.activeIndex].crop"
                @crop="onCrop"
            ></CropPanel>
        </article>
    </main>
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
        return { imgs: [], activeIndex: -1,isShowCrop:false };
    },

    mounted() {},

    methods: {
        onClickThumb(index) {
            this.isShowCrop = true;
            this.activeIndex = index;
        },
        onCrop(data) {
            this.imgs[this.activeIndex].crop = {...this.imgs[this.activeIndex].crop, ...data};
            this.isShowCrop = false;
        },
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