import { useEffect, useState } from 'react';
import { readExplorerState, subscribeExplorer, type ExplorerState } from '../utils/explorer';

export function useExplorer(): ExplorerState {
  const [state, setState] = useState<ExplorerState>(readExplorerState);

  useEffect(() => {
    return subscribeExplorer(() => setState(readExplorerState()));
  }, []);

  return state;
}
