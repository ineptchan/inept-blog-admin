import {$node, $remark} from '@milkdown/kit/utils'
import remarkDirective from 'remark-directive'

/**
 * 1) 让 Milkdown 的 remark 管线认识 directive 语法
 */
export const videoDirective = $remark('videoDirective', () => remarkDirective)

/**
 * 2) 自定义 video 节点
 */
export const videoNode = $node('video', () => ({
    group: 'block',
    atom: true,
    isolating: true,
    defining: true,
    selectable: true,
    draggable: true,
    marks: '',

    attrs: {
        src: {default: ''},
        poster: {default: ''},
        title: {default: ''},
        controls: {default: true},
    },

    parseDOM: [
        {
            tag: 'video[src]',
            getAttrs: (dom) => {
                const el = dom as HTMLVideoElement
                return {
                    src: el.getAttribute('src') ?? '',
                    poster: el.getAttribute('poster') ?? '',
                    title: el.getAttribute('title') ?? '',
                    controls: el.hasAttribute('controls'),
                }
            },
        },
    ],

    toDOM: (node) => {
        const attrs: Record<string, string> = {
            src: node.attrs.src,
            preload: 'metadata',
            style: 'display:block;max-width:100%;height:auto;',
        }

        if (node.attrs.poster) attrs.poster = node.attrs.poster
        if (node.attrs.title) attrs.title = node.attrs.title
        if (node.attrs.controls) attrs.controls = 'true'

        return ['video', attrs]
    },

    /**
     * 把 mdast directive 节点 -> ProseMirror video 节点
     */
    parseMarkdown: {
        match: (node) => node.type === 'leafDirective' && node.name === 'video',
        runner: (state, node, type) => {
            const attrs = (node.attributes ?? {}) as Record<string, string>

            state.addNode(type, {
                src: attrs.src ?? '',
                poster: attrs.poster ?? '',
                title: attrs.title ?? '',
                controls:
                    !('controls' in attrs) || attrs.controls === '' || attrs.controls === 'true',
            })
        },
    },

    /**
     * 把 ProseMirror video 节点 -> mdast directive 节点
     */
    toMarkdown: {
        match: (node) => node.type.name === 'video',
        runner: (state, node) => {
            const attributes: Record<string, string> = {
                src: node.attrs.src,
            }

            if (node.attrs.poster) attributes.poster = node.attrs.poster
            if (node.attrs.title) attributes.title = node.attrs.title
            if (node.attrs.controls) attributes.controls = ''

            state.addNode('leafDirective', undefined, undefined, {
                name: 'video',
                attributes,
            })
        },
    },
}))

/**
 * 3) 导出成一个可 use 的插件数组
 */
export const video = [videoDirective, videoNode].flat()
