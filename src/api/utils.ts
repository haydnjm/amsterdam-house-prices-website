import { CACHE_DURATION_LONG, CACHE_DURATION_SHORT, CacheEntry } from "@/cache";
import queries from "@/db/queries";

export async function getData<T>(
  fetcher: () => Promise<T>,
  cache: CacheEntry<T>,
  cacheDuration: number = CACHE_DURATION_LONG
): Promise<T> {
  if (cache.value && new Date().getTime() < cache.expiration) {
    console.log(`Cache hit for ${fetcher.name}`);
    return cache.value;
  } else {
    console.log(`Cache miss for ${fetcher.name}`);
    const data = await fetcher();
    cache.value = data;
    cache.expiration = new Date().getTime() + cacheDuration;
    return data;
  }
}
