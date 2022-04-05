import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 0. Send a `create` query to the database
const createUser = async () => {
  await prisma.user.create({
    data: {
      name: 'Test User',
      email: `test@test.com`,
      posts: {
        create: { title: 'Hello There!' },
      },
      profile: {
        create: { bio: 'Hola! I am a Test User' },
      },
    },
  });
};

// 1. Read all `User` records from the database
const fetchUsers = async () => {
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.dir(allUsers, { depth: null });
};

// 2. Update a `Post` record in the database
const updatePost = async () => {
  const updatedPost = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  });
  console.log(updatedPost);
};

// 3. Filter all `Post` records that contain "hello"
const filterPosts = async () => {
  const filteredPosts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: 'hello', mode: 'insensitive' } },
        { content: { contains: 'hello', mode: 'insensitive' } },
      ],
    },
  });
  console.dir(filteredPosts, { depth: null });
};

// 4. Create a new `Post` record and connect it to an existing `User` record
const createPost = async () => {
  const newPost = await prisma.post.create({
    data: {
      title: 'New Post',
      author: {
        connect: { email: 'me@syahmifauzi.com' },
      },
    },
  });
  console.dir(newPost, { depth: null });
};

// 5. Delete a `User` record from the database
const deleteUser = async () => {
  const deletedUser = await prisma.user.delete({
    where: { email: 'test@test.com' },
  });
  console.log(deletedUser);
};

async function main() {
  // you will write your Prisma Client queries here

  await createUser();
  await fetchUsers();
  // await updatePost();
  // await filterPosts();
  // await createPost();
  await deleteUser();

  // run `npx prisma studio` to see the database in action
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
