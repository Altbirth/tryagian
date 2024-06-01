import React from "react";
import useSWR from 'swr';
import axios from 'axios';
import Main from "@/layout/mainLayout";
import { Container, Typography } from '@material-ui/core';

import Link from 'next/link'

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface Post {
  title: string;
  content: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  post: Post[];
}

const Home: React.FC = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Main>
      <Container className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md mb-8 text-center">
          <Typography variant="h3" gutterBottom>{data.name}</Typography>

        </div>
        <div className="w-full max-w-md">
          <Typography variant="h6" gutterBottom style={{ marginTop: '2rem'}}>Your Posts</Typography>
          {data.post.map((post, index) => (
            <div key={index} style={{ marginBottom: '3rem' }}>
              <Typography variant="h6" gutterBottom style={{ color: 'white' }}>{post.title}</Typography>
              <Typography variant="body2" gutterBottom style={{ color: 'white' }}>{post.content}</Typography>
            </div>
          ))}
        </div>
        <div className="mb-32 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:w-full lg:max-w-5xl lg:text-left mt-8">
            <Link href="/"
  className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
>
          <h2 className="mb-3 text-2xl font-semibold">
            Home{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            "Go to Home"
          </p>
          </Link>

          <a
            href="/profile"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Profile{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Take a look at your Profile.
            </p>
          </a>

          <a
            href="/posts"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Post{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Share a post.
            </p>
          </a>

          <a
            href="/view"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              View{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Take a look at your Post.
            </p>
          </a>
        </div>
      </Container>
    </Main>
  );
};

export default Home;
