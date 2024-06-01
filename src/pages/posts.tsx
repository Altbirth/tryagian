"use client";

import React from 'react';
import { Container, Typography, TextField, Button, IconButton } from '@material-ui/core';
import { Formik, Form, Field, FieldArray } from 'formik';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import Main from '@/layout/mainLayout';
import DeleteIcon from '@material-ui/icons/Delete';

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

const ProfilePage: React.FC = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Main>
      <Container className='flex flex-col items-center justify-center h-screen'>
        <div className='w-full max-w-md mb-8'>
          <Typography variant="h4" align="center">Posts</Typography>
          <Formik
            initialValues={{ posts: data.post }}
            onSubmit={(values, actions) => {
              axios.put('/api/user', { ...data, post: values.posts })
                .then(res => {
                  mutate('/api/user', { ...data, post: values.posts }, false);
                  console.log('Posts updated successfully');
                })
                .catch(err => {
                  console.error('Error updating posts:', err);
                })
                .finally(() => {
                  actions.setSubmitting(false);
                });
            }}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <FieldArray name="posts">
                  {({ push, remove }) => (
                    <div>
                      {values.posts.map((post, index) => (
                        <div key={index} className="flex items-center mb-4">
                          <div className="flex-grow">
                            <Field
                              name={`posts.${index}.title`}
                              as={TextField}
                              label="Title"
                              fullWidth
                              InputProps={{ style: { color: 'white' } }}
                              InputLabelProps={{ style: { color: 'darkgray' } }}
                              style={{ color: 'white', marginBottom: '1rem' }}
                            />
                            <Field
                              name={`posts.${index}.content`}
                              as={TextField}
                              label="Content"
                              multiline
                              rows={3}
                              fullWidth
                              InputProps={{ style: { color: 'white' } }}
                              InputLabelProps={{ style: { color: 'darkgray' } }}
                              style={{ color: 'white', marginBottom: '1rem' }}
                            />
                          </div>
                          <IconButton
                            onClick={() => remove(index)}
                            aria-label="delete"
                            color="secondary"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      ))}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => push({ title: '', content: '' })}
                        fullWidth
                      >
                        Add Post
                      </Button>
                    </div>
                  )}
                </FieldArray><br /><br />
                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>Save</Button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="mb-32 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:w-full lg:max-w-5xl lg:text-left">
        <Link href="/" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className="mb-3 text-2xl font-semibold">Home<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span></h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">Go to Home</p>
            </Link>
          <a href="/profile" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className="mb-3 text-2xl font-semibold">Profile<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span></h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">Take a look at your Profile.</p>
          </a>
          <a href="/posts" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className="mb-3 text-2xl font-semibold">Post<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span></h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">Share A post</p>
          </a>
          <a href="/view" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className="mb-3 text-2xl font-semibold">View<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span></h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">Take a look at your Post.</p>
          </a>
        </div>
      </Container>
    </Main>
  );
}

export default ProfilePage;
