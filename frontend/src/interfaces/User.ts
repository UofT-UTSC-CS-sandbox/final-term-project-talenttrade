interface UserProfileType {
    user: number;
    username: string;
    full_name: string;
    bio: string;
    location_name: string;
    location_coords: string;
    date_of_birth: string;
    profile_picture: File | string;
    offerings: string;
    is_exact_location: boolean;
}

export default UserProfileType