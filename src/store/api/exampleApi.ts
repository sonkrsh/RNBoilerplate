import {baseApi} from './baseApi';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const exampleApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
    getUser: builder.query<User, number>({
      query: id => `/users/${id}`,
      providesTags: (result, error, id) => [{type: 'User', id}],
    }),
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    getPost: builder.query<Post, number>({
      query: id => `/posts/${id}`,
      providesTags: (result, error, id) => [{type: 'Post', id}],
    }),
    createPost: builder.mutation<Post, Partial<Post>>({
      query: body => ({
        url: '/posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation<Post, { id: number } & Partial<Post>>({
      query: ({ id, ...body }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Post', id },
        'Post',
      ],
    }),
    deletePost: builder.mutation<{ success: boolean; id: number }, number>({
      query: id => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Post', id },
        'Post',
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = exampleApi;