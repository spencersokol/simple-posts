import { PluginOption, ResolvedConfig } from 'vite';
import { ISimplePostOptions } from './vite-plugin.types';
import { ISimplePost } from './simple-post.types';
import ProcessContent from './vite-plugin-process';
import GenerateRSS from './vite-plugin-rss';
import GenerateSitemap from './vite-plugin-sitemap';

export default function SimplePosts(options : ISimplePostOptions) : PluginOption {

    let config: ResolvedConfig;

    return {
        name: 'simple-posts:build',
        apply: 'build',
        configResolved(_config) {
            config = _config;
        },
        buildStart() {

            const { disableRSS = false, disableSitemap = false } = options;

            const content: ISimplePost[] = ProcessContent(config, options);

            if (!disableRSS)
                GenerateRSS(config, options, content);

            if (!disableSitemap)
                GenerateSitemap(config, options, content);

        }
    }
};
