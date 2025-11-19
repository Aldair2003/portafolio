/**
 * Hooks personalizados para GitHub API con SWR
 * 
 * SWR proporciona:
 * - Caché automático
 * - Revalidación en background
 * - Deduplicación de requests
 * - Reintentos automáticos
 */

import useSWR from 'swr';
import { fetchGitHubRepos, type GitHubRepo } from './api';

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || '';

/**
 * Hook para obtener repositorios de GitHub con caché
 * 
 * SWR automáticamente:
 * - Cachea los datos
 * - Revalida cada 5 minutos
 * - Deduplica requests simultáneos
 */
export function useGitHubRepos() {
  const { data, error, isLoading, mutate } = useSWR<GitHubRepo[]>(
    GITHUB_USERNAME ? `github-repos-${GITHUB_USERNAME}` : null,
    () => fetchGitHubRepos(GITHUB_USERNAME),
    {
      revalidateOnFocus: false, // No revalidar al cambiar de pestaña
      revalidateOnReconnect: true, // Revalidar al reconectar
      dedupingInterval: 60000, // 1 minuto de deduplicación
      refreshInterval: 300000, // Revalidar cada 5 minutos
      errorRetryCount: 3, // Reintentar 3 veces en caso de error
      errorRetryInterval: 5000, // Esperar 5 segundos entre reintentos
      fallbackData: [], // Datos por defecto mientras carga
      keepPreviousData: true, // Mantener datos anteriores mientras se actualiza
    }
  );

  return {
    repos: data || [],
    isLoading,
    isError: error,
    mutate, // Función para forzar revalidación manual
  };
}

