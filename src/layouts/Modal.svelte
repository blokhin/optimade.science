<MorphingModal
    {...$$restProps}
    {fullscreen}
    {width}
    {height}
    bind:open
    on:toggle
    on:adjust
>
    <slot />
    <div
        slot="content"
        class:modal-fs={fullscreen}
        class="modal-{size}"
        id="modal-{mid}"
    >
        <div class="modal-container" {style}>
            <div class="modal-header">
                <div class="modal-title h5">
                    <slot name="header" />
                </div>
            </div>
            <div class="modal-body" {style}>
                <div class="content">
                    <slot name="content" />
                </div>
            </div>
            <div class="modal-footer">
                <slot name="footer" />
            </div>
        </div>
    </div>
</MorphingModal>

<script lang="ts" context="module">
    export const SIZE = {
        sm: 320,
        md: 640,
        lg: 960,
    } as const;

    export type Size = keyof typeof SIZE;
</script>

<script lang="ts">
    import MorphingModal from 'svelte-morphing-modal';

    export let open: boolean = false;
    export let size: Size = 'md';
    export let fullscreen: boolean = true;
    export let height: string = '100%';

    const mid: number = Date.now();

    $: width = fullscreen ? '100%' : `${SIZE[size]}px`;
    $: style = `min-width: ${width}; min-height: ${height};`;
</script>

<style lang="scss">
    @import 'spectre.css/src/variables';
    @import 'spectre.css/src/mixins';
    @import 'spectre.css/src/modals';
    .modal-sm {
        @extend .modal.modal-sm;
    }
    .modal-lg {
        @extend .modal.modal-lg;
    }
    [slot='content'] {
        width: 100%;
        height: 100%;
    }
</style>
