import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import Main from '@/layout/mainLayout';

import Link from 'next/link'

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const ProfilePage: React.FC = () => {
  const { data, error } = useSWR('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  const { id, name, email, bio, post } = data; 

  return (
    <Main>
      <Container className='flex flex-col items-center justify-center h-screen'>
        <div className='w-full max-w-md mb-8'>
          <Typography variant="h4" align="center">Profile</Typography>
          <Formik
            initialValues={{ id, name, email, bio, post }}
            onSubmit={(values, actions) => {
              axios.put('/api/user', values)
                .then(res => {
                  mutate('/api/user', values, false);
                  console.log('Profile updated successfully');
                })
                .catch(err => {
                  console.error('Error updating profile:', err);
                })
                .finally(() => {
                  actions.setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="name"
                  as={TextField}
                  label="Name"
                  fullWidth
                  InputProps={{ style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: 'darkgray' } }}
                  style={{ color: 'white' }}
                /><br /><br />
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  type="email"
                  fullWidth
                  InputProps={{ style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: 'darkgray' } }}
                  style={{ color: 'white' }}
                /><br /><br />
                <Field
                  name="bio"
                  as={TextField}
                  multiline
                  rows={3}
                  label="Bio"
                  fullWidth
                  InputProps={{ style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: 'darkgray' } }}
                  style={{ color: 'white' }}
                /><br /><br />
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
            <p className="m-0 max-w-[30ch] text-sm opacity-50">Share a post.</p>
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
