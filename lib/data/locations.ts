export interface StoreHours {
  day:   string
  open:  string
  close: string
}

export interface Location {
  id:          string
  name:        string
  address:     string
  city:        string
  province:    string
  postalCode:  string
  phone:       string
  coordinates: { lat: number; lng: number }
  hours:       StoreHours[]
  amenities:   string[]
  isOpen:      boolean
  distance?:   string
}

export const locations: Location[] = [
  {
    id:         'toronto-downtown',
    name:       'Tim Hortons — King St West',
    address:    '200 King St West',
    city:       'Toronto',
    province:   'ON',
    postalCode: 'M5H 3T4',
    phone:      '(416) 555-0101',
    coordinates: { lat: 43.6477, lng: -79.3847 },
    hours: [
      { day: 'Monday',    open: '5:00 AM', close: '11:00 PM' },
      { day: 'Tuesday',   open: '5:00 AM', close: '11:00 PM' },
      { day: 'Wednesday', open: '5:00 AM', close: '11:00 PM' },
      { day: 'Thursday',  open: '5:00 AM', close: '11:00 PM' },
      { day: 'Friday',    open: '5:00 AM', close: '12:00 AM' },
      { day: 'Saturday',  open: '6:00 AM', close: '12:00 AM' },
      { day: 'Sunday',    open: '6:00 AM', close: '10:00 PM' },
    ],
    amenities: ['Drive-Thru', 'WiFi', 'Mobile Order', 'Dine-In'],
    isOpen:    true,
    distance:  '0.2 km',
  },
  {
    id:         'vancouver-granville',
    name:       'Tim Hortons — Granville St',
    address:    '808 Granville St',
    city:       'Vancouver',
    province:   'BC',
    postalCode: 'V6Z 1K3',
    phone:      '(604) 555-0187',
    coordinates: { lat: 49.2827, lng: -123.1207 },
    hours: [
      { day: 'Monday',    open: '5:00 AM', close: '11:00 PM' },
      { day: 'Tuesday',   open: '5:00 AM', close: '11:00 PM' },
      { day: 'Wednesday', open: '5:00 AM', close: '11:00 PM' },
      { day: 'Thursday',  open: '5:00 AM', close: '11:00 PM' },
      { day: 'Friday',    open: '5:00 AM', close: '12:00 AM' },
      { day: 'Saturday',  open: '6:00 AM', close: '12:00 AM' },
      { day: 'Sunday',    open: '6:00 AM', close: '10:00 PM' },
    ],
    amenities: ['WiFi', 'Mobile Order', 'Dine-In'],
    isOpen:    true,
    distance:  '1.1 km',
  },
  {
    id:         'calgary-centre',
    name:       'Tim Hortons — 8th Ave SW',
    address:    '205 8th Ave SW',
    city:       'Calgary',
    province:   'AB',
    postalCode: 'T2P 1B3',
    phone:      '(403) 555-0143',
    coordinates: { lat: 51.0447, lng: -114.0719 },
    hours: [
      { day: 'Monday',    open: '5:30 AM', close: '10:00 PM' },
      { day: 'Tuesday',   open: '5:30 AM', close: '10:00 PM' },
      { day: 'Wednesday', open: '5:30 AM', close: '10:00 PM' },
      { day: 'Thursday',  open: '5:30 AM', close: '10:00 PM' },
      { day: 'Friday',    open: '5:30 AM', close: '11:00 PM' },
      { day: 'Saturday',  open: '6:00 AM', close: '11:00 PM' },
      { day: 'Sunday',    open: '7:00 AM', close: '9:00 PM'  },
    ],
    amenities: ['Drive-Thru', 'WiFi', 'Mobile Order'],
    isOpen:    false,
    distance:  '2.4 km',
  },
  {
    id:         'montreal-sainte-catherine',
    name:       'Tim Hortons — Ste-Catherine',
    address:    '1255 Rue Sainte-Catherine O',
    city:       'Montreal',
    province:   'QC',
    postalCode: 'H3G 1P3',
    phone:      '(514) 555-0162',
    coordinates: { lat: 45.4972, lng: -73.5748 },
    hours: [
      { day: 'Monday',    open: '5:00 AM', close: '11:00 PM' },
      { day: 'Tuesday',   open: '5:00 AM', close: '11:00 PM' },
      { day: 'Wednesday', open: '5:00 AM', close: '11:00 PM' },
      { day: 'Thursday',  open: '5:00 AM', close: '11:00 PM' },
      { day: 'Friday',    open: '5:00 AM', close: '12:00 AM' },
      { day: 'Saturday',  open: '6:00 AM', close: '12:00 AM' },
      { day: 'Sunday',    open: '6:00 AM', close: '10:00 PM' },
    ],
    amenities: ['WiFi', 'Mobile Order', 'Dine-In', '24h'],
    isOpen:    true,
    distance:  '3.7 km',
  },
  {
    id:         'ottawa-sparks',
    name:       'Tim Hortons — Sparks St',
    address:    '100 Sparks St',
    city:       'Ottawa',
    province:   'ON',
    postalCode: 'K1P 5B7',
    phone:      '(613) 555-0129',
    coordinates: { lat: 45.4215, lng: -75.6972 },
    hours: [
      { day: 'Monday',    open: '6:00 AM', close: '9:00 PM'  },
      { day: 'Tuesday',   open: '6:00 AM', close: '9:00 PM'  },
      { day: 'Wednesday', open: '6:00 AM', close: '9:00 PM'  },
      { day: 'Thursday',  open: '6:00 AM', close: '9:00 PM'  },
      { day: 'Friday',    open: '6:00 AM', close: '10:00 PM' },
      { day: 'Saturday',  open: '7:00 AM', close: '10:00 PM' },
      { day: 'Sunday',    open: '7:00 AM', close: '8:00 PM'  },
    ],
    amenities: ['Drive-Thru', 'WiFi', 'Mobile Order', 'Dine-In'],
    isOpen:    true,
    distance:  '5.2 km',
  },
]

// ── Helper functions ─────────────────────────────────────────

export const getOpenLocations = (): Location[] =>
  locations.filter((loc) => loc.isOpen)

export const getLocationById = (id: string): Location | undefined =>
  locations.find((loc) => loc.id === id)

export const getTodayHours = (location: Location): StoreHours => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const today = days[new Date().getDay()]
  return location.hours.find((h) => h.day === today) ?? location.hours[0]
}