/**
 * Cliente para la API de GitHub
 * 
 * Obtiene información de tus repositorios públicos de GitHub
 * Usa SWR para caché automático y revalidación
 */

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean; // Indica si es un fork
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

/**
 * Obtiene todos los repositorios públicos de un usuario
 */
export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        // Revalidar cada hora (3600 segundos)
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();
    
    // Lista de proyectos destacados que pueden ser forks
    const FEATURED_PROJECTS = [
      'web-kriss-nails',
      'catering-Front',
      'gestion-abogados-sistema',
      'sistema-salud-fronted',
      'parking-front'
    ];
    
    // Filtrar repositorios: incluir destacados aunque sean forks, excluir otros forks y tests
    return repos.filter(
      (repo) => {
        const isTest = repo.name.includes('test');
        const isFeatured = FEATURED_PROJECTS.some(
          name => name.toLowerCase() === repo.name.toLowerCase()
        );
        
        // Incluir si no es test y (no es fork O es un proyecto destacado)
        return !isTest && (!repo.fork || isFeatured);
      }
    );
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

/**
 * Obtiene un repositorio específico
 */
export async function fetchGitHubRepo(
  username: string,
  repoName: string
): Promise<GitHubRepo | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repoName}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub repo:', error);
    return null;
  }
}

