import { SessionsListComponent } from '@/app/(routes)/movies/components/SessionsListComponent'
import DateDropdownComponent from './components/DateDropdownComponent'
import { DateProvider } from '@/context/SelectedDate'
import { getMovies } from '@/services'

export default async function Home() {
  const movies = await getMovies()

  return (
    <DateProvider>
      <div className="items-center justify-items-center max-h-screen flex flex-col">
        <DateDropdownComponent />
        <SessionsListComponent movies={movies} />
      </div>
    </DateProvider>
  )
}
