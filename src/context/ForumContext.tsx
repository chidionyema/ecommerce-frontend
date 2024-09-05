// src/context/ForumContext.tsx

import React, { createContext, useReducer, useContext, ReactNode, useEffect, useState } from 'react';

interface Forum {
  id: string;
  title: string;
  description: string;
  posts: Post[];
}

interface Post {
  id: string;
  content: string;
  author: string;
}

interface State {
  forums: Forum[];
}

type Action = 
  | { type: 'SET_FORUMS'; forums: Forum[] }
  | { type: 'ADD_FORUM'; forum: Forum }
  | { type: 'UPDATE_FORUM'; forum: Forum };

const initialState: State = {
  forums: [],
};

const ForumContext = createContext<{ state: State; dispatch: React.Dispatch<Action>; loading: boolean; error: string | null } | undefined>(undefined);

const forumReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FORUMS':
      return { ...state, forums: action.forums };
    case 'ADD_FORUM':
      return { ...state, forums: [...state.forums, action.forum] };
    case 'UPDATE_FORUM':
      return {
        ...state,
        forums: state.forums.map(f => (f.id === action.forum.id ? action.forum : f)),
      };
    default:
      return state;
  }
};

export const ForumProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(forumReducer, initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await fetch('/api/forums');
        if (!response.ok) throw new Error('Failed to fetch forums');
        const forums = await response.json();
        dispatch({ type: 'SET_FORUMS', forums });
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchForums();
  }, []);

  return <ForumContext.Provider value={{ state, dispatch, loading, error }}>{children}</ForumContext.Provider>;
};

export const useForum = () => {
  const context = useContext(ForumContext);
  if (!context) {
    throw new Error('useForum must be used within a ForumProvider');
  }
  return context;
};
