
export class Training {

    constructor(title, duration, kcal, image) { 
        this.title = title;
        this.duration = duration;
        this.kcal = kcal;
        this.image = image;
    }

    get formattedDuration() {
        const hours = Math.floor(this.duration / 60);
        const minutes = this.duration % 60;

        return `${hours}:${minutes} min`;
    }

    get formattedKcal() {
        return `${this.kcal} kcal`;
    }

    static workoutForWomen() {
        return new Training(
            'Workout For Women',
            30,
            150,
            require('../assets/image-training-1.jpg'),
        );
    }

    static groupWorkout() {
        return new Training(
            'Group Workout',
            110,
            150,
            require('../assets/image-training-3.jpg'),
        );
    }

    static gymnastics() {
        return new Training(
            'Gymnastics',
            30,
            100,
            require('../assets/image-training-2.jpg'),
        );
    }
}
