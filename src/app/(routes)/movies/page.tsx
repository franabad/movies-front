import SessionsListComponent from '@/app/(routes)/movies/components/SessionsListComponent'
import DateDropdownComponent from './components/DateDropdownComponent'
import { DateProvider } from '@/context/SelectedDate'

export default function Home() {
  return (
    <DateProvider>
      <div className="items-center justify-items-center max-h-screen flex flex-col">
        <DateDropdownComponent />
        <SessionsListComponent />
      </div>
    </DateProvider>
  )
}
