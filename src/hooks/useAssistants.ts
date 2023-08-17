import { useQuery, useQueryClient } from 'react-query'
import { BotInfoInterface } from 'types/types'
// import { VISIBILITY_STATUS } from 'constants/constants'
import { getAssistant } from 'api/getAssistant'

interface IGetDist {
  distName: string | undefined
}

interface IGetDistOptions {
  refetchOnMount?: boolean
  useErrorBoundary?: boolean
  retry?: number
}

export const useAssistants = () => {
  const queryClient = useQueryClient()
  const PUBLIC_DISTS = 'publicDists'
  const PRIVATE_DISTS = 'privateDists'
  const DIST = 'dist'

  const getDist = ({ distName }: IGetDist, options?: IGetDistOptions) => {
    const isRetry = options?.retry !== undefined

    return useQuery<BotInfoInterface>({
      queryKey: [DIST, distName],
      queryFn: () => getAssistant(distName!),
      refetchOnMount: Boolean(options?.refetchOnMount),
      refetchOnWindowFocus: true,
      initialData: () => getCachedDist(distName!),
      useErrorBoundary: options?.useErrorBoundary,
      retry: isRetry ? options?.retry : 0,
      enabled: !!distName,
    })
  }

  const getCachedDist = (name: string) => {
    const cachedDist = queryClient.getQueryData<BotInfoInterface | undefined>([DIST, name])
    const isCachedDist = cachedDist !== undefined && cachedDist !== null

    if (isCachedDist) return cachedDist

    const publicDists =
      queryClient.getQueryData<BotInfoInterface[] | undefined>([PUBLIC_DISTS]) || []
    const privateDists =
      queryClient.getQueryData<BotInfoInterface[] | undefined>([PRIVATE_DISTS]) || []
    const result = [...publicDists, ...privateDists]?.find(dist => dist?.name === name)

    return result
  }

  return {
    getDist,
    getCachedDist,
  }
}
