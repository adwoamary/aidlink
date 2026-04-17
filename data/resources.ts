import { Resource, ResourceCategory } from '@/types/resource';

export const resourceCategories: ResourceCategory[] = [
  'Food',
  'Shelter',
  'Medical',
  'Jobs',
  'Financial Help',
];

// Mock data keeps the first version simple while the UI and routes are being built.
export const resources: Resource[] = [
  {
    id: 'community-food-pantry',
    name: 'Community Food Pantry',
    category: 'Food',
    description: 'Offers weekly grocery pickups and emergency meal kits for local families.',
    location: '125 River Street',
    phone: '(555) 201-3001',
    hours: 'Mon-Fri, 9:00 AM - 5:00 PM',
    services: ['Emergency groceries', 'Weekly pantry access', 'Family meal kits'],
  },
  {
    id: 'safe-night-shelter',
    name: 'Safe Night Shelter',
    category: 'Shelter',
    description: 'Provides short-term shelter, showers, and case management referrals.',
    location: '84 Oak Avenue',
    phone: '(555) 201-3002',
    hours: 'Open daily, 24 hours',
    services: ['Short-term beds', 'Showers', 'Case management referrals'],
  },
  {
    id: 'mobile-health-clinic',
    name: 'Mobile Health Clinic',
    category: 'Medical',
    description: 'Connects residents with checkups, basic care, and wellness guidance.',
    location: 'Visits community centers across the city',
    phone: '(555) 201-3003',
    hours: 'Tue-Thu, 10:00 AM - 4:00 PM',
    services: ['Basic checkups', 'Health screenings', 'Care referrals'],
  },
  {
    id: 'career-start-center',
    name: 'Career Start Center',
    category: 'Jobs',
    description: 'Helps job seekers with resumes, interview practice, and employer referrals.',
    location: '210 Market Square',
    phone: '(555) 201-3004',
    hours: 'Mon-Thu, 8:30 AM - 6:00 PM',
    services: ['Resume support', 'Interview coaching', 'Job referrals'],
  },
  {
    id: 'family-financial-aid-desk',
    name: 'Family Financial Aid Desk',
    category: 'Financial Help',
    description: 'Provides short-term emergency grants and benefit application support.',
    location: '52 Grant Avenue',
    phone: '(555) 201-3005',
    hours: 'Mon-Fri, 10:00 AM - 4:30 PM',
    services: ['Emergency grants', 'Benefit applications', 'Budget guidance'],
  },
];

export function getResourceById(id?: string) {
  return resources.find((resource) => resource.id === id);
}
