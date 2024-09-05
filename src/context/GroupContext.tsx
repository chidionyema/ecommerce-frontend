// src/context/GroupContext.tsx

import React, { createContext, useReducer, useContext, ReactNode, useEffect, useState } from 'react';

interface Group {
  id: string;
  name: string;
  description: string;
  members: Member[];
}

interface Member {
  id: string;
  name: string;
}

interface State {
  groups: Group[];
}

type Action = 
  | { type: 'SET_GROUPS'; groups: Group[] }
  | { type: 'ADD_GROUP'; group: Group }
  | { type: 'UPDATE_GROUP'; group: Group };

const initialState: State = {
  groups: [],
};

const GroupContext = createContext<{ state: State; dispatch: React.Dispatch<Action>; loading: boolean; error: string | null } | undefined>(undefined);

const groupReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_GROUPS':
      return { ...state, groups: action.groups };
    case 'ADD_GROUP':
      return { ...state, groups: [...state.groups, action.group] };
    case 'UPDATE_GROUP':
      return {
        ...state,
        groups: state.groups.map(g => (g.id === action.group.id ? action.group : g)),
      };
    default:
      return state;
  }
};

function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
}

export const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(groupReducer, initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('/api/groups');
        if (!response.ok) throw new Error('Failed to fetch groups');
        const groups = await response.json();
        dispatch({ type: 'SET_GROUPS', groups });
      } catch (error) {
        if (isErrorWithMessage(error)) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return <GroupContext.Provider value={{ state, dispatch, loading, error }}>{children}</GroupContext.Provider>;
};

export const useGroup = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error('useGroup must be used within a GroupProvider');
  }
  return context;
};
