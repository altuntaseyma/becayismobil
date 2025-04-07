import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Topic {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  replies: number;
  lastReply: string;
  createdAt: string;
  updatedAt: string;
}

interface Reply {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  topicId: string;
  createdAt: string;
  updatedAt: string;
}

interface ForumState {
  topics: Topic[];
  replies: Reply[];
  loading: boolean;
  error: string | null;
  selectedTopic: Topic | null;
}

const initialState: ForumState = {
  topics: [],
  replies: [],
  loading: false,
  error: null,
  selectedTopic: null,
};

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setTopics: (state, action: PayloadAction<Topic[]>) => {
      state.topics = action.payload;
    },
    addTopic: (state, action: PayloadAction<Topic>) => {
      state.topics.unshift(action.payload);
    },
    updateTopic: (state, action: PayloadAction<Topic>) => {
      const index = state.topics.findIndex(topic => topic.id === action.payload.id);
      if (index !== -1) {
        state.topics[index] = action.payload;
      }
    },
    deleteTopic: (state, action: PayloadAction<string>) => {
      state.topics = state.topics.filter(topic => topic.id !== action.payload);
    },
    setReplies: (state, action: PayloadAction<Reply[]>) => {
      state.replies = action.payload;
    },
    addReply: (state, action: PayloadAction<Reply>) => {
      state.replies.push(action.payload);
    },
    updateReply: (state, action: PayloadAction<Reply>) => {
      const index = state.replies.findIndex(reply => reply.id === action.payload.id);
      if (index !== -1) {
        state.replies[index] = action.payload;
      }
    },
    deleteReply: (state, action: PayloadAction<string>) => {
      state.replies = state.replies.filter(reply => reply.id !== action.payload);
    },
    setSelectedTopic: (state, action: PayloadAction<Topic | null>) => {
      state.selectedTopic = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTopics,
  addTopic,
  updateTopic,
  deleteTopic,
  setReplies,
  addReply,
  updateReply,
  deleteReply,
  setSelectedTopic,
  setLoading,
  setError,
} = forumSlice.actions;

export default forumSlice.reducer; 