import { render, screen } from '@testing-library/react'
import Map from '.'

describe('<Map />', () => {
  it('shoud render wighout any marker', () => {
    render(<Map places={[]} />)

    expect(
      screen.getByRole('link', {
        name: /openstreetmap/i
      })
    ).toBeInTheDocument()
  })

  it('should render with the marker in correct place', () => {
    const place = {
      id: '1',
      name: 'Petropolis',
      slug: 'petropolis',
      location: {
        latitude: 0,
        longitude: 0
      }
    }
    const place2 = {
      id: '2',
      name: 'Bahia',
      slug: 'Bahia',
      location: {
        latitude: 129,
        longitude: 80
      }
    }
    render(<Map places={[place, place2]} />)

    expect(screen.getByTitle(/petropolis/i)).toBeInTheDocument()
    expect(screen.getByTitle(/bahia/i)).toBeInTheDocument()
  })
})
