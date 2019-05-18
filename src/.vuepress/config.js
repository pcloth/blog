module.exports = {
    configureWebpack: {
        resolve: {}
    },
    base: '/blog/',
    dest: '../docs',
    title: 'Hello Pcloth',
    description: '技术整理博客',
    host: '0.0.0.0',
    themeConfig: {
        lastUpdated: 'Last Updated', // string | boolean
        nav: [
            { text: '首页', link: '/' },
            {
                text: '树莓派',
                items: [
                    { text: '新手上路', link: '/pi/' },
                    { text: '人脸识别', link: '/pi/CAP.md' }
                ]
            },
            {
                text: 'Python',
                items: [
                    // { text: 'python笔记', link: '/python/' },
                    {
                        text: 'Django',
                        items: [
                            { text: '设计一个权限系统', link: '/python/django/permission.md' }
                        ]
                    },
                ]
            }
        ],
        sidebar: 'auto',
        activeHeaderLinks: true,
        collapsable: true,

    }
}