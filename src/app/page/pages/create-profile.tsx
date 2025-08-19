import VolunteerProfileForm from '../components/VolunteerProfileForm';

export default function CreateProfile() {
  return (
    <div>
      <header style={{ background: '#089ff8', padding: '1rem 2rem', color: 'white' }}>
        <h1>Create Volunteer Profile</h1>
      </header>

      <main style={{ padding: '1rem 2rem' }}>
        <VolunteerProfileForm />
      </main>
    </div>
  );
}
