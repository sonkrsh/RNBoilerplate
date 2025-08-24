import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Button, Text, Input, Loading, Surface } from '../../components/atoms';
import { ApiErrorBoundary } from '../../utilities';
import {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from '../../store/api/exampleApi';
import { styles } from './styles';

interface Post {
  id?: number;
  title: string;
  body: string;
  userId: number;
}

export default function CRUDDemoScreen() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Post>({
    title: '',
    body: '',
    userId: 1,
  });
  const [isCreating, setIsCreating] = useState(false);

  // API Hooks
  const {
    data: posts,
    error: postsError,
    isLoading: postsLoading,
    refetch: refetchPosts,
  } = useGetPostsQuery();
  const {
    data: selectedPost,
    error: postError,
    isLoading: postLoading,
  } = useGetPostQuery(selectedPostId!, {
    skip: !selectedPostId,
  });

  const [createPost, { isLoading: isCreatingPost }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdatingPost }] = useUpdatePostMutation();
  const [deletePost, { isLoading: isDeletingPost }] = useDeletePostMutation();

  // Load selected post data into form
  React.useEffect(() => {
    if (selectedPost && !isCreating) {
      setFormData({
        title: selectedPost.title,
        body: selectedPost.body,
        userId: selectedPost.userId,
      });
    }
  }, [selectedPost, isCreating]);

  // Handlers
  const handleSelectPost = (postId: number) => {
    setSelectedPostId(postId);
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setSelectedPostId(null);
    setIsCreating(true);
    setFormData({
      title: '',
      body: '',
      userId: 1,
    });
  };

  const handleCreate = async () => {
    try {
      const result = await createPost(formData).unwrap();
      Alert.alert('Success', `Post created with ID: ${result.id}`);
      handleCreateNew(); // Reset form
    } catch (error) {
      console.error('Create failed:', error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedPostId) return;
    try {
      await updatePost({ id: selectedPostId, ...formData }).unwrap();
      Alert.alert('Success', 'Post updated successfully');
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedPostId) return;
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePost(selectedPostId).unwrap();
              Alert.alert('Success', 'Post deleted successfully');
              setSelectedPostId(null);
              setFormData({ title: '', body: '', userId: 1 });
            } catch (error) {
              console.error('Delete failed:', error);
            }
          },
        },
      ],
    );
  };

  const isLoading =
    postsLoading ||
    postLoading ||
    isCreatingPost ||
    isUpdatingPost ||
    isDeletingPost;

  return (
    <ScrollView style={styles.container}>
      <Text variant="h2" weight="bold" align="center" style={styles.title}>
        Posts CRUD Demo
      </Text>

      {/* Posts List */}
      <ApiErrorBoundary error={postsError} refetch={refetchPosts}>
        <Surface padding="md" radius="md" style={styles.section}>
          <Text variant="h3" weight="semibold" style={styles.sectionTitle}>
            📋 All Posts
          </Text>

          {postsLoading && <Loading text="Loading posts..." />}

          {posts && (
            <View style={styles.postsList}>
              {posts.slice(0, 10).map(post => (
                <Surface
                  key={post.id}
                  padding="sm"
                  radius="sm"
                  background={
                    selectedPostId === post.id ? 'accent' : 'secondary'
                  }
                  style={styles.postItem}
                >
                  <Button
                    title={`${post.id}. ${post.title}`}
                    variant="outline"
                    onPress={() => handleSelectPost(post.id)}
                    style={styles.postButton}
                  />
                </Surface>
              ))}
            </View>
          )}
        </Surface>
      </ApiErrorBoundary>

      {/* Selected Post Details */}
      {selectedPost && !isCreating && (
        <ApiErrorBoundary error={postError}>
          <Surface padding="md" radius="md" style={styles.section}>
            <Text variant="h3" weight="semibold" style={styles.sectionTitle}>
              📄 Post Details (ID: {selectedPost.id})
            </Text>
            <Text variant="body" style={styles.postDetail}>
              <Text weight="semibold">Title:</Text> {selectedPost.title}
            </Text>
            <Text variant="body" style={styles.postDetail}>
              <Text weight="semibold">Body:</Text> {selectedPost.body}
            </Text>
            <Text variant="body" style={styles.postDetail}>
              <Text weight="semibold">User ID:</Text> {selectedPost.userId}
            </Text>
          </Surface>
        </ApiErrorBoundary>
      )}

      {/* CRUD Form */}
      <Surface padding="md" radius="md" style={styles.section}>
        <Text variant="h3" weight="semibold" style={styles.sectionTitle}>
          ✏️{' '}
          {isCreating
            ? 'Create New Post'
            : selectedPostId
            ? 'Edit Post'
            : 'Select a post to edit'}
        </Text>

        <Input
          label="Title"
          value={formData.title}
          onChangeText={title => setFormData({ ...formData, title })}
          placeholder="Enter post title"
          style={styles.input}
        />

        <Input
          label="Body"
          value={formData.body}
          onChangeText={body => setFormData({ ...formData, body })}
          placeholder="Enter post body"
          multiline
          numberOfLines={4}
          style={styles.input}
        />

        <Input
          label="User ID"
          value={formData.userId.toString()}
          onChangeText={userId =>
            setFormData({ ...formData, userId: parseInt(userId) || 1 })
          }
          placeholder="Enter user ID"
          keyboardType="numeric"
          style={styles.input}
        />

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <Button
            title="New Post"
            variant="outline"
            onPress={handleCreateNew}
            style={styles.actionButton}
          />

          {isCreating && (
            <Button
              title="Create"
              onPress={handleCreate}
              disabled={isLoading || !formData.title.trim()}
              style={styles.actionButton}
            />
          )}

          {selectedPostId && !isCreating && (
            <>
              <Button
                title="Update"
                onPress={handleUpdate}
                disabled={isLoading || !formData.title.trim()}
                style={styles.actionButton}
              />
              <Button
                title="Delete"
                variant="secondary"
                onPress={handleDelete}
                disabled={isLoading}
                style={styles.actionButton}
              />
            </>
          )}
        </View>

        {isLoading && <Loading text="Processing..." />}
      </Surface>

      {/* API Info */}
      <Surface
        padding="md"
        radius="md"
        background="secondary"
        style={styles.section}
      >
        <Text variant="caption" color="secondary" align="center">
          💡 This demo uses JSONPlaceholder API
          {'\n'}• GET /posts - List posts
          {'\n'}• GET /posts/:id - Get post details
          {'\n'}• POST /posts - Create post (mock)
          {'\n'}• PUT /posts/:id - Update post (mock)
          {'\n'}• DELETE /posts/:id - Delete post (mock)
        </Text>
      </Surface>
    </ScrollView>
  );
}
