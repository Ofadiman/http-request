import { program } from 'commander'
import { z } from 'zod'
import axios from 'axios'
import { info, error, setFailed } from '@actions/core'

program
  .option('-m, --method <string>', 'The HTTP method (get or options) used when sending request.')
  .option('-t, --timeout <number>', 'The maximum time (ms) to wait for a successful HTTP request.')
  .option('-u, --url <string>', 'The URL to which HTTP request will be sent.')

const schema = z.object({
  method: z.enum(['get', 'options']),
  timeout: z.coerce.number().int().positive(),
  url: z.string().url(),
})

const parsedOptions = schema.safeParse(program.parse().opts())
if (parsedOptions.success) {
  axios[parsedOptions.data.method](parsedOptions.data.url, {
    timeout: parsedOptions.data.timeout,
  })
    .then(() => {
      info('Successfully executed http request.')
    })
    .catch((err) => {
      if (err.response) {
        error(
          'The request was made and the server responded with a status code that falls out of the range of 2xx.',
        )
      } else if (err.request) {
        error('The request was made but no response was received.')
      } else {
        error('Something happened in setting up the request that triggered an Error.')
      }

      setFailed(err)
    })
} else {
  setFailed(parsedOptions.error)
}
