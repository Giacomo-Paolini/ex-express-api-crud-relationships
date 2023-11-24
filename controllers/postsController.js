const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function index(req, res) {
    const filter = {}
    const { word, online } = req.query
    if (word !== undefined || online !== undefined) {
        filter.title = {
            contains: word
        }
        filter.published = {
            equals: online === 'true'  // Confronta il valore di online con la stringa 'true'
        }
    } else {
        return new Error("oops")
    }
    
    const posts = await prisma.post.findMany({
        where: {
            published: true,
            slug: {
                startsWith: 'tutorial'
            }
        },
    });

    return res.json(posts);
}

async function store(req, res) {
    const data = req.body;
    console.log(data)
    const newPost = await prisma.post.create({
        data: {
            title: data.title,
            slug: data.slug,
            image: data.image,
            content: data.content,
            published: data.published,
            category: {
                create: {
                    title: data.category,
                }
            },
            tags: {
                create: {
                    title: data.tags
                }
            }           
        }
    })

    return res.json(newPost);
}

async function show(req, res) {
    const slug = req.params.slug;
    const showPost = await prisma.post.findUnique({
        where: {
            slug: String(slug)
        }
    })

    return res.json(showPost);
}

async function update(req, res) {
    const slug = req.params.slug;
    const data = req.body;
    console.log(data)

    const post = await prisma.post.findUnique({
        where: {
            slug: String(slug)
        }
    })

    if (!post) {
        throw new Error('oh nooo')
    }

    const postUpdate = await prisma.post.update({
        data: data,
        where: {
            slug: String(slug),
        },
    })

    return res.json(postUpdate);
}

async function destroy(req, res) {
    const slug = req.params.slug;
    const postDelete = await prisma.post.delete({
        where: {
            slug: String(slug),
        },

    })
    if (!postDelete) {
        throw new Error('omggg')
    }

    return res.json('deleted post');
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
};