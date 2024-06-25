CREATE OR REPLACE FUNCTION changeLearnerSchool(learner_id INT, school_id INT)
RETURNS VOID AS $$
BEGIN
    -- Check if the learner is currently linked to any school
    IF EXISTS (
        SELECT 1
        FROM learner_school
        WHERE learner_id = $1 AND current_school = TRUE
    ) THEN
        -- Mark the current link as not current
        UPDATE learner_school
        SET current_school = FALSE
        WHERE learner_id = $1 AND current_school = TRUE;
        
        -- Insert a new link and set it as the current school
        INSERT INTO learner_school (learner_id, school_id, current_school)
        VALUES ($1, $2, TRUE);
    END IF;
END;
$$ LANGUAGE plpgsql;

services:
    postgresql:
        image: postgres:latest
        env:
          POSTGRES_USER: my_user
          POSTGRES_PASSWORD: my_password
          POSTGRES_DB: my_database
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'

    - name: Install dependencies
      run: npm install

    - name: Wait for PostgreSQL
      run: until pg_isready -h localhost -p 5432; do echo waiting for database; sleep 1; done

    - name: Run database migrations
      run: npm run migrate

    - name: Run tests
      env:
        DB_URL: postgresql://my_user:my_password@localhost:5432/my_database
      run: npm test