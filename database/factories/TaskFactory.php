<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence,
            'user_id' => 1,
            'description' => fake()->paragraph(),
            'state' => fake()->randomElement(['not_started', 'in_progress', 'done']),
            'priority' => fake()->randomElement(['low', 'medium', 'high']),
        ];
    }
}
