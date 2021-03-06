import asyncable from 'svelte-asyncable';
import { query } from 'svelte-pathfinder';
import debounce from 'debounce-promise';

import optimade from '@/services/optimade';
import providers from '@/stores/providers';
import { searchDelay } from '@/config';

const getStructuresAll = debounce((providers, filter) => {
    return optimade.getStructuresAll(providers, filter) || [];
}, searchDelay);

export default asyncable(async ($query) => {
    if (!$query.filter) return [];

    await providers.get(); // just wait until providers loaded

    const results = await getStructuresAll($query.providers, $query.filter);

    return results.sort((a, b) => {
        if ((a[0] && a[0].length) && (!b[0] || !b[0].length)) return -1;
        if ((!a[0] || !a[0].length) && (b[0] && b[0].length)) return 1;
        return 0;
    });
}, null, [query]);